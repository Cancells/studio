'use client';

import { PortfolioValue } from './portfolio-value';
import { InvestmentChart } from './investment-chart';
import { InvestmentsList } from './investments-list';
import { MarketTracker } from './market-tracker';
import { AiSummary } from './ai-summary';

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <div className="space-y-6 lg:col-span-2 xl:col-span-3">
        <PortfolioValue />
        <InvestmentChart />
        <InvestmentsList />
      </div>
      <div className="space-y-6 lg:col-span-1 xl:col-span-1">
        <MarketTracker />
        <AiSummary />
      </div>
    </div>
  );
}
