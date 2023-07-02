import config from '../../config/config';
import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
  clientId: config.clientId,
  brokers: [config.broker],
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

const startNotificationProducer = async () => {
  await producer.connect();

  const sendMessage = async (topic: string, message: any) => {
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
  };

  const sendEmailNotification = async ({
    attachments,
    receiver,
    subject,
    messageBody,
    from,
  }: {
    attachments: any;
    receiver: string;
    subject: string;
    messageBody: any;
    from: string;
  }) => {
    const message = JSON.stringify({ attachments, receiver, subject, messageBody, from });
    await sendMessage('email-topic', message);
  };

  const sendSMSNotification = async ({ phoneNumber, text }: { phoneNumber: string; text: string }) => {
    const message = JSON.stringify({ phoneNumber, text });
    await sendMessage('sms-topic', message);
  };
  const emailMessage = {
    receiver: 'receiver@exmaple.com',
    from: 'sender@example.com',
    subject: 'notified notification',
    messageBody: 'You have message!',
    attachments: 'Referral_Link among others',
  };

  const SMSMessage = { phoneNumber: '08077571020', text: 'this be a sample message' };

  await sendEmailNotification(emailMessage);
  await sendSMSNotification(SMSMessage);

  await producer.disconnect();
};

export default startNotificationProducer;
