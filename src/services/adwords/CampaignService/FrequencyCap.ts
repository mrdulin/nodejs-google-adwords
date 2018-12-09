enum TimeUnit {
  MINUTE = 'MINUTE',
  HOUR = 'HOUR',
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  LIFETIME = 'LIFETIME',
}

enum Level {
  CREATIVE = 'CREATIVE',
  ADGROUP = 'ADGROUP',
  CAMPAIGN = 'CAMPAIGN',
  UNKNOWN = 'UNKNOWN',
}

interface IFrequencyCap {
  impressions: number;
  timeUnit?: TimeUnit;
  level?: Level;
}

export { IFrequencyCap, TimeUnit, Level };
