"use server";
import twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const number = process.env.TWILIO_NUM;

const client = twilio(accountSid, authToken);
console.log(client);

export async function sendSms(
  recipient: string,
  message: string
): Promise<string | null> {
  try {
    // Basic validation for Philippine numbers: +639xxxxxxxxx (12 digits total)
    if (!/^\+639\d{9}$/.test(recipient)) {
      console.error(
        `Invalid recipient number: ${recipient}. Must be in +639xxxxxxxxx format.`
      );
      return "Invalid recipient number format. Must be +639xxxxxxxxx"; // Indicate the error
    }
    console.log(accountSid);
    console.log(authToken);
    console.log(number);
    const twilioMessage = await client.messages.create({
      body: message,
      from: number,
      to: recipient,
    });

    console.log(`SMS sent to ${recipient}. SID: ${twilioMessage.sid}`);
    return null; // Return null on successful send
  } catch (error) {
    console.error(`Error sending SMS to ${recipient}:`, error);

    //Improved error handling to return specific Twilio error messages when available
    if (error instanceof Error && "message" in error) {
      return error.message;
    }
    return "Failed to send SMS due to an unexpected error."; // Generic error message
  }
}
