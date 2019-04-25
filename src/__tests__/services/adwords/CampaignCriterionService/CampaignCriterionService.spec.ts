import faker from 'faker';

import { adwordsService } from '../../initialize';
import { INegativeCampaignCriterion } from '../../../../services/adwords/CampaignCriterionService/CampaignCriterion';

describe('CampaignCriterionService test suites', () => {
  const campaignCriterionService = adwordsService.getService('CampaignCriterionService', { verbose: false });
  it.skip('#getAllByCampaignIds', async () => {
    const campaignIds = ['1677467977'];
    const actualValue = await campaignCriterionService.getAllByCampaignIds(campaignIds);
  });

  it.skip('#getAllLocationCriterionByCampaignIds', async () => {
    const campaignIds = ['1677467977'];
    const actualValue = await campaignCriterionService.getAllLocationCriterionByCampaignIds(campaignIds);
  });

  // TODO
  // it.skip('#add', async () => {
  //   const cmapaignId = '1677467977';
  //   const campaignCriterionOperations: INegativeCampaignCriterion[] = [
  //     {
  //       campaignId,
  //       criterion:
  //     }
  //   ]
  //   const actualValue = await campaignCriterionService.add(label);
  // });
});
