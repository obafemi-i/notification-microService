import { type EachMessagePayload, Kafka } from 'kafkajs';
import config from '../../config/config';
import handleEmailMessage from '../Email/emails';
import handleSMSMessage from '../SMS/sms';

const kafka = new Kafka({
  clientId: config.clientId,
  brokers: [config.broker],
});

const consumer = kafka.consumer({ groupId: 'notification-microservice' });

const handleMessage = async ({ topic, partition, message }: EachMessagePayload) => {
  if (message.value === null) {
    throw new Error('No message was passed into the queue');
  }
  // eslint-disable-next-line no-console
  console.log(`Received message from topic '${topic}': ${message.value.toString()}`);

  if (topic === 'email-topic') {
    await handleEmailMessage(message);
  } else if (topic === 'sms-topic') {
    await handleSMSMessage(message);
  } else {
    // eslint-disable-next-line no-console
    console.log('Unknown topic:', topic);
  }

  await consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
};

const runConsumer = async () => {
  await consumer.connect();
  await Promise.all(
    ['email-topic', 'sms-topic'].map(async (topic) => {
      await consumer.subscribe({ topic });
    })
  );
  // eslint-disable-next-line no-console
  console.log('Consumer subscribed to topics: email-topic, sms-topic');
  await consumer.run({
    eachMessage: handleMessage,
  });
};

export default runConsumer;
