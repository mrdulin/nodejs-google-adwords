import { RegistryService } from '../core';
import { CampaignService } from './CampaignService';
import { AdGroupService } from './AdGroupService';
import { AdGroupAdService } from './AdGroupAdService';
import { BudgetService } from './BudgetService';
import { LabelService } from './LabelService';

interface IServiceMap {
  CampaignService: CampaignService;
  AdGroupService: AdGroupService;
  AdGroupAdService: AdGroupAdService;
  BudgetService: BudgetService;
  LabelService: LabelService;
}

const registryService = RegistryService.init()
  .register(CampaignService.name, CampaignService)
  .register(AdGroupService.name, AdGroupService)
  .register(AdGroupAdService.name, AdGroupAdService)
  .register(BudgetService.name, BudgetService)
  .register(LabelService.name, LabelService);

export { registryService, IServiceMap };
