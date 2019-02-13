import { RegistryService } from '../core';
import { CampaignService } from './CampaignService';

interface IServiceMap {
  CampaignService: CampaignService;
}

const registryService = RegistryService.init().register('CampaignService', CampaignService);

export { registryService, IServiceMap };
