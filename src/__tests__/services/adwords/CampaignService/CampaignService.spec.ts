import { adwordsService } from '../../initialize';
import { IPaging } from '../../../../models/adwords';

describe('CampaignService test suites', () => {
  const campaignService = adwordsService.getService('CampaignService');
  it.skip('#getAll', async () => {
    const actualValue = await campaignService.getAll();
  });

  it.skip('#getByPage', async () => {
    const paging: IPaging = {
      startIndex: 0,
      numberResults: 1
    };
    const actualValue = await campaignService.getByPage(paging);
  });

  it('#getById', async () => {
    const id = '1677467977';
    const actualValue = await campaignService.getById(id);
  });
});
