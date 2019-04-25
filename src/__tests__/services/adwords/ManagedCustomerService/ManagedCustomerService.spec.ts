import { adwordsService } from '../../initialize';
describe('ManagedCustomerService test suites', () => {
  const managedCustomerService = adwordsService.getService('ManagedCustomerService', {
    verbose: false
  });
  it('#getByCustomerIds', async () => {
    const actualValue = await managedCustomerService.getAccountHierarchy();
  });
});
