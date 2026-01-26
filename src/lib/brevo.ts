// This is a placeholder for Brevo API integration
// Documentation: https://github.com/getbrevo/brevo-node

const SibApiV3Sdk = require('sib-api-v3-sdk');
import { env } from './env';

let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendAuditReportEmail = async (email: string, reportData: any) => {
  if (!env.BREVO_API_KEY) {
    console.warn("BREVO_API_KEY not found. Skipping email.");
    return;
  }

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = "Your AI Readiness Audit Report";
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <h1>AI Readiness Audit Report for ${reportData.clientName}</h1>
        <p>Thank you for using our service. Your audit is ready.</p>
        <p>Estimated Monthly Savings: $${reportData.estimatedMonthlySavings}</p>
        <p>Readiness Score: ${reportData.readinessScore}%</p>
      </body>
    </html>
  `;
  sendSmtpEmail.sender = { name: "AI Audit Tool", email: "noreply@aiaudit.com" };
  sendSmtpEmail.to = [{ email: email }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
