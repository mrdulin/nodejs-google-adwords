import { ISelector } from '../../../types/adwords';
import { ReportDefinition } from './enum/ReportDefinition';

export interface IReportDefinition {
  selector: ISelector;
  reportName: string;
  reportType: ReportDefinition.ReportType;
  dateRangeType: ReportDefinition.DateRangeType;
  downloadFormat?: ReportDefinition.DownloadFormatType;
}
