import { pd } from 'pretty-data';
import _ from 'lodash';

import { adwordsService } from '../../initialize';
import { ILocationCriterion } from '../../../../services/adwords/LocationCriterionService';
import { ILocation } from '../../../../services/adwords/LocationCriterionService/Location';
describe('LocationCriterionService test suites', () => {
  const locationCriterionService = adwordsService.getService('LocationCriterionService', { verbose: false });
  it.skip('#getByIds', async () => {
    const countryTerritory = '2616';
    const city = '1031082';
    const actualValue = await locationCriterionService.getByIds([countryTerritory, city]);
  });

  it.skip('#getByNames', async () => {
    const locationNames = ['new york'];
    const actualValue = await locationCriterionService.getByNames(locationNames);
  });

  it('#getByNames - 2', async () => {
    const locationNames = ['Colorado'];
    const actualValue = await locationCriterionService.getByNames(locationNames);
    if (actualValue) {
      console.log('actualValue: ', pd.json(actualValue));
    }
  });
});
