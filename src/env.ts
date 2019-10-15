import dotenv, { DotenvConfigOutput } from 'dotenv';
import path from 'path';

const dotenvOutput: DotenvConfigOutput = dotenv.config({ path: path.resolve(__dirname, '../.env-dev') });

if (dotenvOutput.error) {
  throw dotenvOutput.error;
}
if (process.env.PRINT_ENV) {
  console.log('dotenvOutput.parsed: ', dotenvOutput.parsed);
}
