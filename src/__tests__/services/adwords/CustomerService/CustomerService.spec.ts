import { adwordsService } from '../../initialize';

describe('CustomerService test suites', () => {
  const customerService = adwordsService.getService('CustomerService', { verbose: false });
  it('#getCustomers', async () => {
    const actualValue = await customerService.getCustomers();
  });
});
