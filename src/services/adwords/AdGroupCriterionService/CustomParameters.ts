import { ICustomParameter } from './CustomParameter';

export interface ICustomParameters {
  parameters: ICustomParameter[];
  doReplace?: boolean;
}
