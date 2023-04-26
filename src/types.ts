export type MarketInfo = {
  market: string;
  marketKo: string;
  average: number;
  envelopmin5: number;
  envelopmin20: number;
  envelopplus5: number;
  catchTime: string;
};

export type MarketInfoList = Array<MarketInfo>;
