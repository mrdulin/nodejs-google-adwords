import { IDisplayAttribute } from './LabelAttribute';

namespace Label {
  export enum status {
    ENABLED = 'ENABLED',
    REMOVED = 'REMOVED',
    UNKNOWN = 'UNKNOWN',
  }

  export enum Type {
    TextLabel = 'TextLabel',
  }
}

interface ILabel {
  id?: string;
  name: string;
  status?: Label.status;
  attribute: IDisplayAttribute;
  attributes?: {
    'xsi:type': Label.Type;
  };
}

interface ITextLabel extends ILabel {}

export { ILabel, Label, ITextLabel };
