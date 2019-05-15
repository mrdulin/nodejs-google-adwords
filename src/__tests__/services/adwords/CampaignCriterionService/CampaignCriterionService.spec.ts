import { pd } from 'pretty-data';

import { adwordsService } from '../../initialize';
import { ICampaignCriterion } from '../../../../services/adwords/CampaignCriterionService/CampaignCriterion';
import { IAddress } from '../../../../services/adwords/CampaignCriterionService';
import { IProximity } from '../../../../services/adwords/CampaignCriterionService/Criterion';
import { Proximity } from '../../../../services/adwords/CampaignCriterionService/enum/Proximity';

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

  it.skip('#add', async () => {
    const campaignId = '1677467977';
    const campaignCriterions: ICampaignCriterion[] = [
      {
        campaignId,
        criterion: {
          id: '9001634',
          'Criterion.Type': 'Location',
        },
      },
    ];
    const actualValue = await campaignCriterionService.add(campaignCriterions);
  });

  it.skip('#add - with proximity', async () => {
    const campaignId = '1895039275';
    const address: IAddress = {
      // order is matter
      streetAddress: '2560 saint',
      cityName: 'bronx',
      postalCode: '10461',
      countryCode: 'US',
    };
    const proximity: IProximity = {
      // order is matter
      radiusDistanceUnits: Proximity.DistanceUnits.KILOMETERS,
      radiusInUnits: 10,
      address,
      'Criterion.Type': 'Proximity',
    };
    const campaignCriterions: ICampaignCriterion[] = [
      {
        campaignId,
        criterion: proximity,
      },
    ];
    const actualValue = await campaignCriterionService.add(campaignCriterions);
    console.log('actualValue: ', pd.json(actualValue));
  });

  // If there is radius: location=location_address+location_additional_address+location_city+location_self_state+location_self_zip+location_radius
  // If there is no radius and with location_state: location=location_state
  // If there is no radius and no location_state: location=location_zip
  it('#add - with complex logic', async () => {
    const campaignId = '1895039275';
    const address: IAddress = {
      // order is matter
      streetAddress: '1155 6th ave.',
      cityName: 'NYC',
      postalCode: '10000',
      countryCode: 'US',
    };
    const proximity: IProximity = {
      // order is matter
      radiusDistanceUnits: Proximity.DistanceUnits.KILOMETERS,
      radiusInUnits: 10,
      address,
      'Criterion.Type': 'Proximity',
    };
    const campaignCriterions: ICampaignCriterion[] = [
      {
        campaignId,
        criterion: proximity,
      },
    ];
    const actualValue = await campaignCriterionService.add(campaignCriterions);
    console.log('actualValue: ', pd.json(actualValue));
  });
});
