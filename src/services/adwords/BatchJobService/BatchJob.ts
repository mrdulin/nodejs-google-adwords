import { BatchJobStatus } from './enum/BatchJobStatus';
import { IProgressStats } from './ProgressStats';
import { ITemporaryUrl } from './TemporaryUrl';
import { IBatchJobProcessingError } from './ApiError';

interface IBatchJobRaw {
  id: string;
  status: BatchJobStatus;
  readonly progressStats: IProgressStats;
  readonly uploadUrl: ITemporaryUrl;
  readonly downloadUrl: ITemporaryUrl;
  processingErrors: IBatchJobProcessingError[];
  readonly diskUsageQuotaBalance: string;
}

export interface IBatchJob extends Partial<IBatchJobRaw> {}
