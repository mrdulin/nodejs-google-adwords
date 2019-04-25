import { adwordsService } from '../../initialize';
describe('ManagedCustomerService test suites', () => {
  const managedCustomerService = adwordsService.getService('ManagedCustomerService', {
    verbose: false,
    namespace: 'https://adwords.google.com/api/adwords/mcm'
  });
  it('#getByCustomerIds', async () => {
    const actualValue = await managedCustomerService.getAccountHierarchy();
  });
});
