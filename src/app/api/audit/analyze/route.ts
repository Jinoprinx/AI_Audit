import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { env } from '@/lib/env';

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { 
            businessName, 
            businessType, 
            businessModel, 
            dailyActivities, 
            customerProcess, 
            revenueRange, 
            employeeCount, 
            painPoints, 
            toolsUsed, 
            otherTools, 
            growthTarget, 
            roadblocks 
        } = body;

        const toolsList = Object.entries(toolsUsed)
            .filter(([_, value]) => value === true)
            .map(([key, _]) => key)
            .join(', ');

        const prompt = `
            You are an elite business consultant specializing in helping small local businesses grow using modern technology and AI. 
            Analyze the following business data and provide a comprehensive, practical growth roadmap.

            BUSINESS DATA:
            - Name: ${businessName}
            - Type: ${businessType}
            - Model: ${businessModel}
            - Operations: ${dailyActivities}
            - Customer Flow: ${customerProcess}
            - Scale: ${revenueRange} revenue, ${employeeCount} employees
            - Pain Points: ${painPoints}
            - Tech Stack: ${toolsList}${otherTools ? ', ' + otherTools : ''}
            - Goals: Targeting ${growthTarget} revenue
            - Roadblocks: ${roadblocks}

            OUTPUT FORMAT (JSON):
            Provide the response in the following JSON structure:
            {
                "executiveSummary": "A professional 2-3 sentence overview.",
                "profitRecommendations": [
                    { "title": "...", "description": "...", "benefit": "Save X amount of money/time" }
                ],
                "operationFixes": [
                    { "title": "...", "description": "...", "benefit": "Reclaim X hours/week" }
                ],
                "aiSupercharge": {
                    "strategy": "A custom AI strategy for this specific business.",
                    "implentationSteps": ["Step 1...", "Step 2..."],
                    "marketingCTA": "Jinonet AI Solutions specializes in turning these AI strategies into reality for businesses like yours. Whether you need a simple automated responder or a complex custom AI workflow, we can build it. Contact us via Email or WhatsApp at 09116585600 to start your automation journey."
                }
            }

            Tone: Professional, encouraging, and very practical. Focus on "Low Hanging Fruit" first.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful business growth advisor. Always output valid JSON." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const reportData = JSON.parse(response.choices[0].message.content || '{}');

        return NextResponse.json(reportData);
    } catch (error: any) {
        console.error('AI Analysis Error:', error.message || error);
        return NextResponse.json({ 
            error: 'Failed to analyze business data',
            details: error.message || 'Unknown error'
        }, { status: 500 });
    }
}
