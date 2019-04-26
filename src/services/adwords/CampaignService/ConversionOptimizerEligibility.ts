namespace ConversionOptimizerEligibility {
  export enum RejectionReason {
    CAMPAIGN_IS_NOT_ACTIVE = 'CAMPAIGN_IS_NOT_ACTIVE',
    NOT_CPC_CAMPAIGN = 'NOT_CPC_CAMPAIGN',
    CONVERSION_TRACKING_NOT_ENABLED = 'CONVERSION_TRACKING_NOT_ENABLED',
    NOT_ENOUGH_CONVERSIONS = 'NOT_ENOUGH_CONVERSIONS',
    UNKNOWN = 'UNKNOWN',
  }
}

interface IConversionOptimizerEligibility {
  eligible: boolean;
  rejectionReasons: ConversionOptimizerEligibility.RejectionReason;
}

export { IConversionOptimizerEligibility };
