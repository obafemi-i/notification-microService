import producer from './modules/producer/producer';

producer()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Producer running...');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to run kafka producer', error);
  });
