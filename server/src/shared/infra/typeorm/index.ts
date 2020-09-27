/* eslint-disable no-console */
import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('Database connection established ✅');
  })
  .catch((error) => {
    console.warn('An error occurred while connecting to database ❌');

    if (process.env.ENV === 'DEV') {
      console.log(error);
    }
  });
