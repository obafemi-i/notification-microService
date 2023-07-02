import send from '../sendGrid/sendgrid';

interface EmailNotification {
  receiver: string;
  subject: string;
  messageBody: string;
  from: string;
}

const sendEmail = async (notification: EmailNotification) => {
  const { receiver, subject, messageBody, from } = notification;

  const msg = {
    to: receiver,
    from,
    subject,
    html: messageBody,
  };

  try {
    await send(msg);
    // eslint-disable-next-line no-console
    console.log(`Email ${JSON.stringify(msg)} received`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error sending email', error);
  }
};

const handleEmailMessage = async (message: any) => {
  const notification = JSON.parse(message.value);
  await sendEmail(notification);
};

export default handleEmailMessage;
