import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, pinCode: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with your verified Resend sender email
      to,
      subject: 'Your PIN Code',
      html: `<p>Your PIN code is: <strong>${pinCode}</strong></p>`,
    });

    if (error) {
      console.error("❌ Failed to send email:", error);
      return null;
    }

    console.log(`✅ Email sent successfully to ${to}:`, data);
    return data;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return null;
  }
}
