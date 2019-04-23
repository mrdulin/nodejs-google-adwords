import { ITargetingSettingDetail } from './TargetingSettingDetail';

interface ISetting {
  'Setting.Type'?: string;
}

interface IExplorerAutoOptimizerSetting extends ISetting {
  optIn: boolean;
}

interface ITargetingSetting extends ISetting {
  details: ITargetingSettingDetail[];
}

export { ITargetingSetting, IExplorerAutoOptimizerSetting };
