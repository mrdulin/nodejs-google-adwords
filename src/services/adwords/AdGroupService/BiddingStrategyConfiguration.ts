import { ICpcBid, ICpaBid, ICpmBid } from './Bids';

enum BiddingStrategyType {
  MANUAL_CPC = 'MANUAL_CPC',
  MANUAL_CPM = 'MANUAL_CPM',
  PAGE_ONE_PROMOTED = 'PAGE_ONE_PROMOTED',
  TARGET_SPEND = 'TARGET_SPEND',
  TARGET_CPA = 'TARGET_CPA',
  TARGET_ROAS = 'TARGET_ROAS',
  MAXIMIZE_CONVERSIONS = 'MAXIMIZE_CONVERSIONS',
  MAXIMIZE_CONVERSION_VALUE = 'MAXIMIZE_CONVERSION_VALUE',
  TARGET_OUTRANK_SHARE = 'TARGET_OUTRANK_SHARE',
  NONE = 'NONE',
  UNKNOWN = 'UNKNOWN',
}

enum BiddingStrategySource {
  CAMPAIGN = 'CAMPAIGN',
  ADGROUP = 'ADGROUP',
  CRITERION = 'CRITERION',
}

interface IBiddingStrategyConfiguration {
  biddingStrategyId?: string;
  biddingStrategyName?: string;
  biddingStrategyType?: BiddingStrategyType;
  readonly biddingStrategySource?: BiddingStrategySource;
  // TODO:
  biddingScheme?: any;
  bids?: Array<ICpcBid | ICpaBid | ICpmBid>;
  targetRoasOverride?: number;
}

export { IBiddingStrategyConfiguration, BiddingStrategyType };
