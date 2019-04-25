import { adwordsService } from '../../initialize';
import { ICampaignCriterion } from '../../../../services/adwords/CampaignCriterionService/CampaignCriterion';

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

  it('#add', async () => {
    const campaignId = '1677467977';
    const campaignCriterions: ICampaignCriterion[] = [
      {
        campaignId,
        criterion: {
          id: '9001634',
          attributes: {
            'xsi:type': 'Location'
          }
        }
      }
    ];
    const actualValue = await campaignCriterionService.add(campaignCriterions);
  });
});
