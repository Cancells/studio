'use client';

import { PortfolioValue } from './portfolio-value';
import { InvestmentChart } from './investment-chart';
import { InvestmentsList } from './investments-list';
import { MarketTracker } from './market-tracker';
import { AiSummary } from './ai-summary';

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
        <PortfolioValue />
        <InvestmentChart />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <InvestmentsList />
            <div className="space-y-6">
                <MarketTracker />
                <AiSummary />
            </div>
        </div>
    </div>
  );
}
