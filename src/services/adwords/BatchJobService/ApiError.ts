import { IFieldPathElement } from './FieldPathElement';
import { BatchJobProcessingError } from './enum/BatchJobProcessingError';

export interface IApiError {
  fieldPath: string;
  fieldPathElements: IFieldPathElement[];
  trigger: string;
  errorString: string;
  'ApiError.Type'?: string;
}

export interface IBatchJobProcessingError {
  reason: BatchJobProcessingError.Reason;
  attibutes: {
    'xsi:type': 'BatchJobProcessingError';
  };
}
