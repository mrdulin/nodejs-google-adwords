const AdwordsConstants = require('node-adwords').AdwordsConstants;

const { user } = require('./adwordsUser');

const campaignService = user.getService('CampaignService', 'v201809');

const selector = {
  fields: ['Id', 'Name'],
  ordering: [{ field: 'Name', sortOrder: 'ASCENDING' }],
  paging: { startIndex: 0, numberResults: AdwordsConstants.RECOMMENDED_PAGE_SIZE }
};

campaignService.get({ serviceSelector: selector }, (error, result) => {
  if (error) {
    return console.error(error);
  }

  console.log(result);
});
