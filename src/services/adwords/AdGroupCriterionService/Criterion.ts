import { Criterion } from './enum/Criterion';
import { KeywordMatchType } from './enum/KeywordMatchType';

interface ICriterionRaw {
  id: string;
  readonly type: Criterion.Type;
  'Criterion.Type': string;
}

interface ICriterion extends Partial<ICriterionRaw> {}

interface IKeyword extends ICriterion {
  text: string;
  matchType: KeywordMatchType;
  attributes: {
    'xsi:type': 'Keyword';
  };
}

export { IKeyword, ICriterion };
