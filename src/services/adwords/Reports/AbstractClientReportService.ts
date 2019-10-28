import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import { IReport, IClientReportService } from '../ReportService';

export abstract class ClientReportService implements IClientReportService {
  public async get(reportDefinition: Partial<IReportDefinition>): Promise<string | IReport> {
    throw new Error('not implemented');
  }
}
