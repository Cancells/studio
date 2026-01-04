'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInvestments } from '@/context/investment-context';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function PortfolioValue() {
  const { totalValue, totalGainLoss, todaysGainLoss } = useInvestments();

  const GainLossIndicator = ({ value }: { value: number }) => {
    const isPositive = value >= 0;
    return (
      <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
        {formatCurrency(value)}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{formatCurrency(totalValue)}</div>
        <div className="mt-2 flex items-center space-x-6">
          <div>
            <p className="text-xs text-muted-foreground">Today's Gain/Loss</p>
            <GainLossIndicator value={todaysGainLoss} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Gain/Loss</p>
            <GainLossIndicator value={totalGainLoss} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
