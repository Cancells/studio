'use client';

import { Building, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useInvestments } from '@/context/investment-context';
import { formatCurrency } from '@/lib/utils';
import { GoldBarIcon } from '@/components/icons';
import type { AssetType } from '@/lib/types';
import { Button } from '../ui/button';

const AssetIcon = ({ type }: { type: AssetType }) => {
  const iconProps = { className: "h-8 w-8 text-muted-foreground" };
  if (type === 'gold') {
    return <GoldBarIcon {...iconProps} />;
  }
  return <Building {...iconProps} />;
};

export function InvestmentsList() {
  const { investments, assets, removeInvestment } = useInvestments();

  return (
    <Card className='bg-transparent border-0 shadow-none'>
      <CardHeader className='p-0'>
        <CardTitle className='text-lg font-bold'>Investing</CardTitle>
      </CardHeader>
      <CardContent className='p-0 mt-4'>
        {investments.length === 0 ? (
           <div className="text-center py-8 text-muted-foreground rounded-lg bg-card border">
                <p>You haven&apos;t added any investments yet.</p>
                <p>Click &quot;Add Investment&quot; to get started.</p>
            </div>
        ) : (
            <div className='flex flex-col gap-2'>
            {investments.map((investment) => {
              const asset = assets.find((a) => a.ticker === investment.assetTicker);
              if (!asset) return null;

              const quantity = investment.amount / investment.purchasePrice;
              const currentValue = quantity * asset.price;
              const gainLoss = currentValue - investment.amount;
              const gainLossPercent = (gainLoss / investment.amount) * 100;
              const isPositive = gainLoss >= 0;

              return (
                <div key={investment.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
                    <div className="flex items-center gap-4">
                        <AssetIcon type={asset.type} />
                        <div>
                            <div className="font-bold">{asset.name}</div>
                            <div className="text-sm text-muted-foreground">{quantity.toFixed(2)} Shares</div>
                        </div>
                    </div>
                    <div className='text-right'>
                        <div className="font-bold">{formatCurrency(currentValue)}</div>
                        <div className={`text-sm font-medium ${isPositive ? 'text-primary' : 'text-destructive'}`}>
                            {isPositive ? '+' : ''}{gainLossPercent.toFixed(2)}%
                        </div>
                    </div>
                </div>
              );
            })}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
