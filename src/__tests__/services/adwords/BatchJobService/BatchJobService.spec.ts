import { adwordsService } from '../../../initialize';

describe('BatchJobService test suites', () => {
  const batchJobService = adwordsService.getService('BatchJobService', { verbose: false });
  it('#getAll', async () => {
    const actualValue = await batchJobService.getAll();
  });
});
