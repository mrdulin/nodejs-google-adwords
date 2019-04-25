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
  .register(ManagedCustomerService.name, ManagedCustomerService);

export { registryService, IServiceMap };
