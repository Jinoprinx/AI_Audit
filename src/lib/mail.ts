import { env } from './env';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

const sendEmailViaAPI = async ({ to, subject, html }: SendEmailParams) => {
  if (!env.BREVO_API_KEY) {
    console.warn("BREVO_API_KEY not found. Skipping email.");
    return;
  }

  // Debug logging (masked)
  console.log(`[Mail] Using Sender: jino4rex@gmail.com`);
  console.log(`[Mail] BREVO_SMTP_LOGIN present: ${!!env.BREVO_SMTP_LOGIN}`);
  console.log(`[Mail] BREVO_API_KEY length: ${env.BREVO_API_KEY.length}`);
  console.log(`[Mail] BREVO_API_KEY starts with: ${env.BREVO_API_KEY.substring(0, 4)}...`);

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "AI Audit Tool",
          email: "jino4rex@gmail.com",
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API Error:", JSON.stringify(errorData, null, 2));
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Email sent successfully via Brevo API:', data.messageId || 'Success');
    return data;
  } catch (error) {
    console.error("Error sending email via Brevo API:", error);
    throw error;
  }
};

export const sendAuditReportEmail = async (email: string, reportData: any) => {
  const html = `
      <html>
        <body style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #D80000;">AI Readiness Audit Report for ${reportData.clientName}</h1>
          <p>Thank you for using our service. Your audit is ready.</p>
          <p>Estimated Monthly Savings: $${reportData.estimatedMonthlySavings}</p>
          <p>Readiness Score: ${reportData.readinessScore}%</p>
        </body>
      </html>
    `;

  return sendEmailViaAPI({
    to: email,
    subject: "Your AI Readiness Audit Report",
    html,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const baseUrl = env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const verificationLink = `${baseUrl}/auth/verify?token=${token}`;

  const html = `
      <html>
        <body style="font-family: sans-serif; padding: 20px; color: #333; background-color: #f9f9f7;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 20px; border: 1px solid #eee;">
            <h1 style="color: #D80000; font-family: serif;">Welcome to AI Audit</h1>
            <p style="font-size: 16px; line-height: 1.6;">Please confirm your email address to access your audit dashboard and generate professional ROI reports.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" style="display: inline-block; padding: 14px 28px; background-color: #D80000; color: white; text-decoration: none; border-radius: 50px; font-weight: bold;">Verify My Account</a>
            </div>
            <p style="font-size: 12px; color: #999; text-align: center;">If you didn't create an account, you can safely ignore this email.</p>
          </div>
        </body>
      </html>
    `;

  return sendEmailViaAPI({
    to: email,
    subject: "Verify your AI Audit Account",
    html,
  });
};

export const sendNewsletterVerification = async (email: string) => {
  const html = `
      <html>
        <body style="font-family: sans-serif; padding: 20px; color: #333; background-color: #f9f9f7;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 20px; border: 1px solid #eee;">
            <h2 style="color: #C5A059; font-family: serif;">Strategic AI Insights</h2>
            <p style="font-size: 16px; line-height: 1.6;">Thank you for subscribing. Please confirm your email to start receiving our weekly AI business roadmap.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="display: inline-block; padding: 14px 28px; background-color: #000; color: white; text-decoration: none; border-radius: 50px; font-weight: bold;">Confirm Subscription</a>
            </div>
          </div>
        </body>
      </html>
    `;

  try {
    await sendEmailViaAPI({
      to: email,
      subject: "Confirm your AI Insights Subscription",
      html,
    });
    console.log('Newsletter verification email sent');
  } catch (error) {
    console.error("Error sending newsletter confirmation:", error);
  }
};
