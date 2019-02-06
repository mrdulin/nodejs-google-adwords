import { RegistryService } from '../core';
import { CampaignService } from './CampaignService';
import { AdGroupService } from './AdGroupService';

interface IServiceMap {
  CampaignService: CampaignService;
  AdGroupService: AdGroupService;
}

const registryService = RegistryService.init()
  .register(CampaignService.name, CampaignService)
  .register(AdGroupService.name, AdGroupService);

export { registryService, IServiceMap };
