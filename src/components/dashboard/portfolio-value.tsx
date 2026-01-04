'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInvestments } from '@/context/investment-context';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function PortfolioValue() {
  const { totalValue, totalGainLoss, todaysGainLoss, investments } = useInvestments();

  const todaysChangePercent = totalValue > 0 && (totalValue - todaysGainLoss) > 0 
    ? (todaysGainLoss / (totalValue - todaysGainLoss)) * 100
    : 0;

  const GainLossIndicator = ({ value, percent, period }: { value: number, percent: number, period: string }) => {
    const isPositive = value > 0;
    const isNegative = value < 0;
    const isNeutral = value === 0;
    const colorClass = isPositive ? 'text-primary' : isNegative ? 'text-destructive' : 'text-muted-foreground';

    return (
      <div className={`flex items-baseline gap-2 ${colorClass}`}>
        <div className='flex items-center'>
            {isPositive && <TrendingUp className="h-4 w-4" />}
            {isNegative && <TrendingDown className="h-4 w-4" />}
            {isNeutral && <Minus className="h-4 w-4" />}
            <span className="font-medium">{formatCurrency(value)}</span>
        </div>
        <span className="font-medium">({percent.toFixed(2)}%)</span>
        <span className="text-xs text-muted-foreground">{period}</span>
      </div>
    );
  };

  return (
    <div className="w-full">
        <div className="text-4xl font-bold tracking-tight">{formatCurrency(totalValue)}</div>
        <div className="mt-1 flex items-center space-x-4">
            <GainLossIndicator value={todaysGainLoss} percent={todaysChangePercent} period="Today" />
        </div>
    </div>
  );
}
