import { adwordsService } from '../../initialize';
import { IPaging } from '../../../../types/adwords';
import { ICampaignLabel } from '../../../../services/adwords/CampaignService/CampaignLabel';

describe('CampaignService test suites', () => {
  const campaignService = adwordsService.getService('CampaignService', {
    verbose: false,
  });
  it.skip('#getAll', async () => {
    const actualValue = await campaignService.getAll();
  });

  it('#getByPage', async () => {
    const paging: IPaging = {
      startIndex: 0,
      numberResults: 1,
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

  it.skip('#addLabel', async () => {
    // properties order is important
    const campaignLabel: ICampaignLabel = {
      labelId: '3763644304',
      campaignId: '1677467977',
    };
    const actualValue = await campaignService.addLabel(campaignLabel);
  });
});
