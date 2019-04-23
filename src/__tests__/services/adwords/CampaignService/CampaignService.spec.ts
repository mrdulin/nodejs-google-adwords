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

  it.skip('#getById', async () => {
    const id = '1677467977';
    const actualValue = await campaignService.getById(id);
  });

  it.skip('#getAllEnabled', async () => {
    const actualValue = await campaignService.getAllEnabled();
  });
  it.skip('#getAllButRemoved', async () => {
    const actualValue = await campaignService.getAllButRemoved();
  });

  it.skip('#remove', async () => {
    const campaignId = '1726553725';
    const actualValue = await campaignService.remove(campaignId);
  });
});
