import { Criterion } from './enum/Criterion';
import { KeywordMatchType } from './enum/KeywordMatchType';
import { IAttributes } from '../../../types/adwords';
import { AgeRange } from './enum/AgeRange';
import { Gender } from './enum/Gender';

interface ICriterionRaw<Type> extends IAttributes<Type> {
  id: string | number;
  readonly type: Criterion.Type;
  'Criterion.Type': string;
}

interface ICriterion<Type> extends Partial<ICriterionRaw<Type>> {}

interface IKeyword extends ICriterion<'Keyword'> {
  text: string;
  matchType: KeywordMatchType;
}

interface IGender extends ICriterion<'Gender'> {
  genderType: Gender.GenderType;
}

interface IAgeRange extends ICriterion<'AgeRange'> {
  ageRangeType: AgeRange.AgeRangeType;
}

export { IKeyword, IGender, IAgeRange, ICriterion };
