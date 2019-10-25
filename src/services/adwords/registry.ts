import { RegistryService } from '../core';
import { CampaignService } from './CampaignService';
import { AdGroupService } from './AdGroupService';
import { AdGroupAdService } from './AdGroupAdService';
import { BudgetService } from './BudgetService';
import { LabelService } from './LabelService';
import { AdGroupCriterionService } from './AdGroupCriterionService';
import { CampaignCriterionService } from './CampaignCriterionService';
import { LocationCriterionService } from './LocationCriterionService';
import { ManagedCustomerService } from './ManagedCustomerService';
import { CustomerService } from './CustomerService';
import { ReportDefinitionService } from './ReportDefinitionService';
import {
  CampaignPerformanceReportService,
  GeoPerformanceReportService,
  GenderPerformanceReportService,
  AgeRangePerformanceReportService,
  AdPerformanceReportService,
  AdGroupPerformanceReportService,
  AudiencePerformanceReportService,
} from './Reports';
import { BatchJobService } from './BatchJobService';
import { MediaService } from './MediaService';

interface IServiceMap {
  CampaignService: CampaignService;
  AdGroupService: AdGroupService;
  AdGroupAdService: AdGroupAdService;
  BudgetService: BudgetService;
  LabelService: LabelService;
  AdGroupCriterionService: AdGroupCriterionService;
  CampaignCriterionService: CampaignCriterionService;
  LocationCriterionService: LocationCriterionService;
  ManagedCustomerService: ManagedCustomerService;
  CustomerService: CustomerService;
  ReportDefinitionService: ReportDefinitionService;
  BatchJobService: BatchJobService;
  MediaService: MediaService;
  CampaignPerformanceReportService: CampaignPerformanceReportService;
  GeoPerformanceReportService: GeoPerformanceReportService;
  GenderPerformanceReportService: GenderPerformanceReportService;
  AgeRangePerformanceReportService: AgeRangePerformanceReportService;
  AdPerformanceReportService: AdPerformanceReportService;
  AdGroupPerformanceReportService: AdGroupPerformanceReportService;
  AudiencePerformanceReportService: AudiencePerformanceReportService;
}

const registryService = RegistryService.init()
  .register(CampaignService)
  .register(AdGroupService)
  .register(AdGroupAdService)
  .register(BudgetService)
  .register(LabelService)
  .register(AdGroupCriterionService)
  .register(CampaignCriterionService)
  .register(LocationCriterionService)
  .register(ManagedCustomerService)
  .register(CustomerService)
  .register(ReportDefinitionService)
  .register(BatchJobService)
  .register(MediaService)
  .register(CampaignPerformanceReportService)
  .register(GeoPerformanceReportService)
  .register(GenderPerformanceReportService)
  .register(AgeRangePerformanceReportService)
  .register(AdPerformanceReportService)
  .register(AdGroupPerformanceReportService)
  .register(AudiencePerformanceReportService);

export { registryService, IServiceMap };
