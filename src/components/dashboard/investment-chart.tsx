'use client';

import { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { portfolioHistory } from '@/lib/market-data';
import type { PortfolioHistoryPoint } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useInvestments } from '@/context/investment-context';

type Period = 'daily' | 'monthly' | 'yearly';

const chartConfig = {
  value: {
    label: 'Value',
  },
};

export function InvestmentChart() {
  const [period, setPeriod] = useState<Period>('daily');
  const { totalValue } = useInvestments();

  const chartData: PortfolioHistoryPoint[] = portfolioHistory[period];

  const firstValue = chartData[0]?.value ?? 0;
  const isUp = totalValue >= firstValue;

  const chartColor = isUp ? 'hsl(var(--primary))' : 'hsl(var(--destructive))';
  chartConfig.value.color = chartColor;

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          accessibilityLayer
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '3 3' }}
            content={
              <ChartTooltipContent
                indicator="line"
                formatter={(value) => formatCurrency(Number(value))}
                labelClassName="text-background"
                className="bg-foreground text-background rounded-md"
              />
            }
          />
          <Area
            dataKey="value"
            type="monotone"
            fill="url(#chartGradient)"
            stroke={chartColor}
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ChartContainer>
      <div className="mt-4">
        <Tabs defaultValue={period} onValueChange={(v) => setPeriod(v as Period)} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-transparent p-0">
            <TabsTrigger value="daily" className="rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">1D</TabsTrigger>
            <TabsTrigger value="daily" className="rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">1W</TabsTrigger>
            <TabsTrigger value="monthly" className="rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">1M</TabsTrigger>
            <TabsTrigger value="yearly" className="rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">1Y</TabsTrigger>
            <TabsTrigger value="yearly" className="rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
