import { adwordsService } from '../../initialize';

describe('BudgetService test suites', () => {
  const budgetService = adwordsService.getService('BudgetService');
  it('#getAll', async () => {
    const actualValue = await budgetService.getAll();
  });
});
