import faker from 'faker';

import { adwordsService } from '../../initialize';
import { IPaging } from '../../../../models/adwords';
import { BudgetService, IBudget, Budget } from '../../../../services/adwords';

describe('BudgetService test suites', () => {
  const budgetService = adwordsService.getService('BudgetService', { verbose: false });
  it('#getAll', async () => {
    const actualValue = await budgetService.getAll();
  });

  it.skip('#getByPage', async () => {
    const paging: IPaging = {
      startIndex: 0,
      numberResults: 2
    };
    const actualValue = await budgetService.getByPage(paging);
  });

  it.skip('#getById', async () => {
    const budgetId = '1730783974';
    const actualValue = await budgetService.getById(budgetId);
  });

  it.skip('#getByIds', async () => {
    const budgetIds = ['1730783974', '1730787529'];
    const actualValue = await budgetService.getByIds(budgetIds);
  });

  it.skip('#add', async () => {
    const budget: IBudget = {
      name: faker.lorem.word(),
      amount: {
        microAmount: BudgetService.UNIT
      },
      deliveryMethod: Budget.BudgetDeliveryMethod.STANDARD,
      isExplicitlyShared: false,
      status: Budget.BudgetStatus.ENABLED
    };

    const actualValue = await budgetService.add(budget);
  });
});
