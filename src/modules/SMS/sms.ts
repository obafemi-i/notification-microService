import twilio from 'twilio';
import config from '../../config/config';

// Twilio configuration
const twilioAccountSid = config.sid;
const twilioAuthToken = config.token;
const twilioPhoneNumber = config.phoneNumber;

const sendSMS = async (message: any) => {
  try {
    const { phoneNumber, text }: { phoneNumber: string; text: string } = message;

    if (phoneNumber === undefined || text === undefined) {
      throw new Error('Please provide phone number and email');
    }
    // send SMS usig twilio
    const twilioClient = twilio(twilioAccountSid, twilioAuthToken);
    await twilioClient.messages.create({
      body: text,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });
    // eslint-disable-next-line no-console
    console.log(`SMS received. Phone number: ${phoneNumber}, text: ${text}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error sending SMS', error);
  }
};

const handleSMSMessage = async (message: any) => {
  const notification = JSON.parse(message.value);
  await sendSMS(notification);
};

export default handleSMSMessage;
