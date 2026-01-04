'use client';

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import type { Investment, Asset } from '@/lib/types';
import { assets as initialAssets } from '@/lib/market-data';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking, deleteDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Loader } from 'lucide-react';

interface InvestmentContextType {
  investments: Investment[];
  assets: Asset[];
  addInvestment: (investment: Omit<Investment, 'id' | 'userId'>) => void;
  removeInvestment: (investmentId: string) => void;
  totalValue: number;
  totalGainLoss: number;
  todaysGainLoss: number;
  isLoading: boolean;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const InvestmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets] = useState<Asset[]>(initialAssets);
  const { user } = useUser();
  const firestore = useFirestore();

  const investmentsCollectionRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'investments');
  }, [user, firestore]);

  const { data: investmentsData, isLoading: isLoadingInvestments } = useCollection<Omit<Investment, 'purchaseDate'> & { purchaseDate: string }>(investmentsCollectionRef);

  const investments = useMemo(() => {
    if (!investmentsData) return [];
    return investmentsData.map(inv => ({
      ...inv,
      purchaseDate: new Date(inv.purchaseDate),
    }));
  }, [investmentsData]);


  const addInvestment = useCallback((investment: Omit<Investment, 'id' | 'userId'>) => {
    if (!investmentsCollectionRef || !user) return;
    addDocumentNonBlocking(investmentsCollectionRef, { 
        ...investment, 
        userId: user.uid,
        purchaseDate: investment.purchaseDate.toISOString() 
    });
  }, [investmentsCollectionRef, user]);

  const removeInvestment = useCallback((investmentId: string) => {
    if (!user || !firestore) return;
    const investmentDocRef = doc(firestore, 'users', user.uid, 'investments', investmentId);
    deleteDocumentNonBlocking(investmentDocRef);
  }, [user, firestore]);

  const { totalValue, totalGainLoss, todaysGainLoss } = useMemo(() => {
    if (!investments) return { totalValue: 0, totalGainLoss: 0, todaysGainLoss: 0 };
    
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
    removeInvestment,
    totalValue,
    totalGainLoss,
    todaysGainLoss,
    isLoading: isLoadingInvestments,
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
