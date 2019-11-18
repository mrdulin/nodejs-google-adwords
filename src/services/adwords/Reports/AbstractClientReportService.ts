import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import { IReport, IClientReportService, IReportDownloadOptions } from '../ReportService';

export abstract class ClientReportService implements IClientReportService {
  private options?: Partial<IReportDownloadOptions>;
  public async get(reportDefinition: Partial<IReportDefinition>): Promise<string | IReport> {
    throw new Error('not implemented');
  }
  protected setOptions(options: Partial<IReportDownloadOptions>): void {
    this.options = options;
  }
  protected getOptions(): Partial<IReportDownloadOptions> | undefined {
    return this.options;
  }
}
