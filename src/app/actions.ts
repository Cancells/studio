'use server';

import type { Investment } from '@/lib/types';
import { assets } from '@/lib/market-data';

export async function getAiSummary(
  investments: Investment[]
): Promise<string> {
  // We only want to summarize investments from the last month for this example
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const recentInvestments = investments.filter(
    (inv) => inv.purchaseDate > oneMonthAgo
  );

  if (recentInvestments.length === 0) {
    return "No new investments in the last month to summarize.";
  }
  
  // This is a static summary. The Genkit flow has been removed.
  return `This month, you invested in Fawry, which saw a 2.5% price increase. Your gold holdings also performed well, increasing by 0.75%. Keep an eye on your tech stocks, as the market is showing volatility. diversification into different sectors could be a good next step.`;
}
