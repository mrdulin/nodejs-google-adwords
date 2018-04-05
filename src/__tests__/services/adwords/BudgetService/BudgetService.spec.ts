import faker from 'faker';

import { adwordsService } from '../../initialize';
import { IPaging } from '../../../../types/adwords';
import { BudgetService, Budget, IBudget } from '../../../../services/adwords/BudgetService';

describe('BudgetService test suites', () => {
  const budgetService = adwordsService.getService('BudgetService', { verbose: false });
  it.skip('#getAll', async () => {
    const actualValue = await budgetService.getAll();
  });

  it('#getByPage', async () => {
    const paging: IPaging = {
      startIndex: 0,
      numberResults: 2,
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
        microAmount: BudgetService.UNIT,
      },
      deliveryMethod: Budget.BudgetDeliveryMethod.STANDARD,
      isExplicitlyShared: false,
      status: Budget.BudgetStatus.ENABLED,
    };

    const actualValue = await budgetService.add(budget);
  });

  it.skip('#update', async () => {
    const budget: IBudget = {
      budgetId: '1865779148',
      isExplicitlyShared: true,
    };
    const actualValue = await budgetService.update(budget);
  });

  it.skip('#remove', async () => {
    const budgetIds: string[] = ['1902117292'];
    const actualValue = await budgetService.remove(budgetIds);
  });
});
