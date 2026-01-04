import type { Investment } from './types';

export const initialInvestments: Investment[] = [
  {
    id: '1',
    assetTicker: 'COMI',
    purchaseDate: new Date('2023-05-15'),
    amount: 50000,
    purchasePrice: 75.5,
  },
  {
    id: '2',
    assetTicker: 'TMGH',
    purchaseDate: new Date('2023-08-20'),
    amount: 30000,
    purchasePrice: 25.2,
  },
  {
    id: '3',
    assetTicker: 'GOLD',
    purchaseDate: new Date('2023-01-10'),
    amount: 100000,
    purchasePrice: 2800,
  },
  {
    id: '4',
    assetTicker: 'FWRY',
    purchaseDate: new Date('2024-02-01'),
    amount: 25000,
    purchasePrice: 5.5,
  },
];
