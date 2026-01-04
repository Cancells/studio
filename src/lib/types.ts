export type AssetType = 'stock' | 'gold';

export interface Asset {
  ticker: string;
  name: string;
  type: AssetType;
  price: number;
  change: number;
}

export interface Investment {
  id: string;
  assetTicker: string;
  purchaseDate: Date;
  amount: number;
  purchasePrice: number;
}

export interface PortfolioHistoryPoint {
  date: string;
  value: number;
}
