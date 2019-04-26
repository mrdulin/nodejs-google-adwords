import './env';

const credentials = {
  ADWORDS_CLIENT_ID: process.env.ADWORDS_CLIENT_ID || '',
  ADWORDS_SECRET: process.env.ADWORDS_SECRET || '',
  ADWORDS_DEVELOPER_TOKEN: process.env.ADWORDS_DEVELOPER_TOKEN || '',
  ADWORDS_CLIENT_CUSTOMER_ID: process.env.ADWORDS_CLIENT_CUSTOMER_ID || '',
  ADWORDS_USER_AGENT: process.env.ADWORDS_USER_AGENT || '',
  ADWORDS_ACCESS_TOKEN: process.env.ADWORDS_ACCESS_TOKEN || '',
  ADWORDS_REFRESH_TOKEN: process.env.ADWORDS_REFRESH_TOKEN || '',
};

export { credentials };
