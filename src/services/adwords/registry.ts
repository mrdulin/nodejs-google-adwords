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
}

const registryService = RegistryService.init()
  .register(CampaignService.name, CampaignService)
  .register(AdGroupService.name, AdGroupService)
  .register(AdGroupAdService.name, AdGroupAdService)
  .register(BudgetService.name, BudgetService)
  .register(LabelService.name, LabelService)
  .register(AdGroupCriterionService.name, AdGroupCriterionService)
  .register(CampaignCriterionService.name, CampaignCriterionService)
  .register(LocationCriterionService.name, LocationCriterionService)
  .register(ManagedCustomerService.name, ManagedCustomerService)
  .register(CustomerService.name, CustomerService)
  .register(ReportDefinitionService.name, ReportDefinitionService)
  .register(BatchJobService.name, BatchJobService)
  .register(MediaService.name, MediaService)
  .register(CampaignPerformanceReportService.name, CampaignPerformanceReportService)
  .register(GeoPerformanceReportService.name, GeoPerformanceReportService)
  .register(GenderPerformanceReportService.name, GenderPerformanceReportService)
  .register(AgeRangePerformanceReportService.name, AgeRangePerformanceReportService)
  .register(AdPerformanceReportService.name, AdPerformanceReportService);

export { registryService, IServiceMap };
