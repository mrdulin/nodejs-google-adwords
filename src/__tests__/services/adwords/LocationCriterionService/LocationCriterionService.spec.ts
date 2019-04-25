import { adwordsService } from '../../initialize';
describe('LocationCriterionService test suites', () => {
  const locationCriterionService = adwordsService.getService('LocationCriterionService', { verbose: false });
  it.skip('#getByIds', async () => {
    const countryTerritory = '2616';
    const city = '1031082';
    const actualValue = await locationCriterionService.getByIds([countryTerritory, city]);
  });

  it('#getByNames', async () => {
    const locationNames = ['new york'];
    const actualValue = await locationCriterionService.getByNames(locationNames);
  });
});
