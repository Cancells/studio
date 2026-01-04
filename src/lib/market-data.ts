import type { Asset, PortfolioHistoryPoint } from './types';

export const assets: Asset[] = [
  { ticker: 'COMI', name: 'Commercial Intl. Bank', type: 'stock', price: 82.3, change: 1.25 },
  { ticker: 'TMGH', name: 'Talaat Moustafa Group', type: 'stock', price: 31.5, change: -0.87 },
  { ticker: 'FWRY', name: 'Fawry', type: 'stock', price: 6.1, change: 2.5 },
  { ticker: 'SWDY', name: 'Elsewedy Electric', type: 'stock', price: 44.7, change: 0.5 },
  { ticker: 'GOLD', name: 'Gold', type: 'gold', price: 3105, change: 0.75 },
  { ticker: 'EGTS', name: 'Egyptian Telecom', type: 'stock', price: 28.9, change: -1.1 },
  { ticker: 'HRHO', name: 'Hermes Holding', type: 'stock', price: 19.2, change: 3.2 },
  { ticker: 'EKHO', name: 'Emaar Misr', type: 'stock', price: 4.8, change: 1.5 },
];

const generateHistory = (days: number, initialValue: number, volatility: number): PortfolioHistoryPoint[] => {
  const history: PortfolioHistoryPoint[] = [];
  let currentValue = initialValue;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    currentValue *= 1 + (Math.random() - 0.5) * volatility;
    history.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: currentValue,
    });
  }
  return history;
};

export const portfolioHistory = {
  daily: generateHistory(30, 185000, 0.02),
  monthly: generateHistory(12, 150000, 0.05).map((p, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11-i));
    return { ...p, date: date.toLocaleDateString('en-US', { month: 'short' }) };
  }),
  yearly: generateHistory(5, 100000, 0.15).map((p, i) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - (4-i));
    return { ...p, date: date.getFullYear().toString() };
  }),
};
