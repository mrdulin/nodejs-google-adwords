import { IFieldPathElement } from './FieldPathElement';

export interface IApiError {
  fieldPath: string;
  fieldPathElements: IFieldPathElement[];
  trigger: string;
  errorString: string;
  'ApiError.Type'?: string;
}
