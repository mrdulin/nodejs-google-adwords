import { IDisplayAttribute } from './LabelAttribute';

namespace Label {
  export enum status {
    ENABLED = 'ENABLED',
    REMOVED = 'REMOVED',
    UNKNOWN = 'UNKNOWN',
  }
}

interface ILabel {
  id?: string;
  name: string;
  status?: Label.status;
  attribute: IDisplayAttribute;
  'Label.Type'?: string;
}

interface ITextLabel extends ILabel {}

export { ILabel, Label, ITextLabel };
