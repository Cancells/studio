'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Investment, Asset } from '@/lib/types';
import { initialInvestments } from '@/lib/investments-data';
import { assets as initialAssets } from '@/lib/market-data';

interface InvestmentContextType {
  investments: Investment[];
  assets: Asset[];
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  totalValue: number;
  totalGainLoss: number;
  todaysGainLoss: number;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const InvestmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [investments, setInvestments] = useState<Investment[]>(initialInvestments);
  const [assets] = useState<Asset[]>(initialAssets);

  const addInvestment = useCallback((investment: Omit<Investment, 'id'>) => {
    setInvestments(prev => [...prev, { ...investment, id: Date.now().toString() }]);
  }, []);

  const { totalValue, totalGainLoss, todaysGainLoss } = useMemo(() => {
    let totalValue = 0;
    let totalPurchaseValue = 0;
    let todaysGainLoss = 0;

    investments.forEach(inv => {
      const asset = assets.find(a => a.ticker === inv.assetTicker);
      if (asset) {
        const quantity = inv.amount / inv.purchasePrice;
        const currentValue = quantity * asset.price;
        totalValue += currentValue;
        totalPurchaseValue += inv.amount;

        const priceYesterday = asset.price / (1 + asset.change / 100);
        const valueYesterday = quantity * priceYesterday;
        todaysGainLoss += currentValue - valueYesterday;
      }
    });

    const totalGainLoss = totalValue - totalPurchaseValue;

    return { totalValue, totalGainLoss, todaysGainLoss };
  }, [investments, assets]);

  const value = {
    investments,
    assets,
    addInvestment,
    totalValue,
    totalGainLoss,
    todaysGainLoss,
  };

  return <InvestmentContext.Provider value={value}>{children}</InvestmentContext.Provider>;
};

export const useInvestments = () => {
  const context = useContext(InvestmentContext);
  if (context === undefined) {
    throw new Error('useInvestments must be used within an InvestmentProvider');
  }
  return context;
};
