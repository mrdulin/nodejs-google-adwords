import faker from 'faker';

import { adwordsService } from '../../../initialize';
import { ITextLabel } from '../../../../services/adwords/LabelService/Label';

describe.skip('LabelService test suites', () => {
  const labelService = adwordsService.getService('LabelService', { verbose: false });
  it.skip('#getAll', async () => {
    const actualValue = await labelService.getAll();
  });

  it.skip('#add', async () => {
    const label: ITextLabel = {
      name: faker.lorem.slug(1),
    };
    const actualValue = await labelService.add(label);
  });
});
