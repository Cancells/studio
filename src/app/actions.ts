'use server';

import { generateMonthlySummary } from '@/ai/flows/monthly-investment-summary';
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

  const investmentDetails = recentInvestments.map(inv => {
    const asset = assets.find(a => a.ticker === inv.assetTicker);
    const currentValue = asset ? (inv.amount / inv.purchasePrice) * asset.price : inv.amount;
    const gainLoss = currentValue - inv.amount;

    return {
      asset: asset?.name || inv.assetTicker,
      purchaseDate: inv.purchaseDate.toLocaleDateString(),
      amount: inv.amount,
      currentValue: currentValue,
      gainLoss: gainLoss,
    };
  })

  const investmentData = JSON.stringify(investmentDetails, null, 2);

  try {
    const result = await generateMonthlySummary({ investmentData });
    return result.summary;
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return 'Could not generate summary at this time. Please try again later.';
  }
}
