import { RegistryService } from '../core';
import { CampaignService } from './CampaignService';

RegistryService.init().register('CampaignService', CampaignService);

export * from './CampaignService';
