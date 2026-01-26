import nodemailer from 'nodemailer';
import { env } from './env';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN || '', // Your Brevo login (email)
    pass: env.BREVO_API_KEY, // Using API key as SMTP password
  },
});

export const sendAuditReportEmail = async (email: string, reportData: any) => {
  if (!env.BREVO_API_KEY) {
    console.warn("BREVO_API_KEY not found. Skipping email.");
    return;
  }

  const mailOptions = {
    from: '"AI Audit Tool" <noreply@aiaudit.com>',
    to: email,
    subject: "Your AI Readiness Audit Report",
    html: `
      <html>
        <body style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #D80000;">AI Readiness Audit Report for ${reportData.clientName}</h1>
          <p>Thank you for using our service. Your audit is ready.</p>
          <p>Estimated Monthly Savings: $${reportData.estimatedMonthlySavings}</p>
          <p>Readiness Score: ${reportData.readinessScore}%</p>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Audit report email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending audit report email:", error);
    throw error;
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  if (!env.BREVO_API_KEY) {
    console.warn("BREVO_API_KEY not found. Skipping verification email.");
    return;
  }

  const verificationLink = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`;

  const mailOptions = {
    from: '"AI Audit Tool" <noreply@aiaudit.com>',
    to: email,
    subject: "Verify your AI Audit Account",
    html: `
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
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

export const sendNewsletterVerification = async (email: string) => {
  if (!env.BREVO_API_KEY) return;

  const mailOptions = {
    from: '"AI Audit Tool" <noreply@aiaudit.com>',
    to: email,
    subject: "Confirm your AI Insights Subscription",
    html: `
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
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Newsletter verification email sent');
  } catch (error) {
    console.error("Error sending newsletter confirmation:", error);
  }
};
