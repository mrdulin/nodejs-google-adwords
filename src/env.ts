// tslint:disable: no-var-requires
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  const path = require('path');

  const dotenvOutput = dotenv.config({ path: path.resolve(__dirname, '../.env-dev') });

  if (dotenvOutput.error) {
    throw dotenvOutput.error;
  }
  if (process.env.PRINT_ENV) {
    console.log('dotenvOutput.parsed: ', dotenvOutput.parsed);
  }
}
