import dotenv, { DotenvConfigOutput } from 'dotenv';
import path from 'path';

const dotenvOutput: DotenvConfigOutput = dotenv.config({ path: path.resolve(__dirname, '../.env-dev') });

if (dotenvOutput.error) {
  throw dotenvOutput.error;
}
console.log('dotenvOutput.parsed: ', dotenvOutput.parsed);
