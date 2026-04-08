// Simple diagnostic without dependencies
const fs = require('fs');
const path = require('path');

// Basic .env parser
function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env');
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value.length > 0) {
            process.env[key.trim()] = value.join('=').trim().replace(/['"]/g, '');
        }
    });
}

async function testEmail() {
    try {
        loadEnv();
        console.log('Testing Brevo API with Sender:', process.env.BREVO_SMTP_LOGIN);
        
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
                sender: {
                    name: "AI Audit Diagnostic",
                    email: process.env.BREVO_SMTP_LOGIN || "jino4rex@gmail.com",
                },
                to: [{ email: "jino4rex@gmail.com" }],
                subject: "Diagnostic Test",
                htmlContent: "<h1>Success</h1><p>If you see this, the API key and sender are working.</p>",
            }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('❌ Brevo Error:', JSON.stringify(data, null, 2));
        } else {
            console.log('✅ Success! Message ID:', data.messageId);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testEmail();
