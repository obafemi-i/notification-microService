import runConsumer from './modules/consumer/consumer';

runConsumer()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Consumer is running...');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to run kafka consumer', error);
  });
