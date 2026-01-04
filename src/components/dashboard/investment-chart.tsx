'use client';

import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { portfolioHistory } from '@/lib/market-data';
import type { PortfolioHistoryPoint } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

type Period = 'daily' | 'monthly' | 'yearly';

export function InvestmentChart() {
  const [period, setPeriod] = useState<Period>('daily');

  const chartData: PortfolioHistoryPoint[] = portfolioHistory[period];

  const chartConfig = {
    value: {
      label: 'Value',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Performance</CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)} className="space-x-1">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatCurrency(Number(value)).replace('EGP', '')}
            />
            <Tooltip
              cursor
              content={<ChartTooltipContent
                indicator="line"
                formatter={(value) => formatCurrency(Number(value))}
                />}
            />
            <Area
              dataKey="value"
              type="monotone"
              fill="url(#colorValue)"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
