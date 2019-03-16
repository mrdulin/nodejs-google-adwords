import { RegistryService } from '../core';
import { CampaignService } from './CampaignService';
import { AdGroupService } from './AdGroupService';
import { AdGroupAdService } from './AdGroupAdService';
import { BudgetService } from './BudgetService';
import { LabelService } from './LabelService';
import { AdGroupCriterionService } from './AdGroupCriterionService';

interface IServiceMap {
  CampaignService: CampaignService;
  AdGroupService: AdGroupService;
  AdGroupAdService: AdGroupAdService;
  BudgetService: BudgetService;
  LabelService: LabelService;
  AdGroupCriterionService: AdGroupCriterionService;
}

const registryService = RegistryService.init()
  .register(CampaignService.name, CampaignService)
  .register(AdGroupService.name, AdGroupService)
  .register(AdGroupAdService.name, AdGroupAdService)
  .register(BudgetService.name, BudgetService)
  .register(LabelService.name, LabelService)
  .register(AdGroupCriterionService.name, AdGroupCriterionService);

export { registryService, IServiceMap };
