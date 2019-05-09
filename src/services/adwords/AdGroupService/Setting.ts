import { ITargetingSettingDetail } from './TargetingSettingDetail';
import { IAttributes } from '../../../types/adwords';

interface ISetting<Type> extends IAttributes<Type> {
  'Setting.Type'?: string;
}

interface IExplorerAutoOptimizerSetting extends ISetting<'ExplorerAutoOptimizerSetting'> {
  optIn: boolean;
}

interface ITargetingSetting extends ISetting<'TargetingSetting'> {
  details: ITargetingSettingDetail[];
}

export { ITargetingSetting, IExplorerAutoOptimizerSetting };
