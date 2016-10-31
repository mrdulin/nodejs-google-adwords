require('dotenv').config();

const AdwordsUser = require('node-adwords').AdwordsUser;

let user = new AdwordsUser({
  developerToken: process.env.ADWORDS_DEVELOPER_TOKEN, //your adwords developerToken
  userAgent: process.env.ADWORDS_USER_AGENT, //any company name
  clientCustomerId: process.env.ADWORDS_CLIENT_CUSTOMER_ID, //the Adwords Account id (e.g. 123-123-123)
  client_id: process.env.ADWORDS_CLIENT_ID, //this is the api console client_id
  client_secret: process.env.ADWORDS_SECRET,
  refresh_token: process.env.ADWORDS_REFRESH_TOKEN
});

module.exports = { user };
