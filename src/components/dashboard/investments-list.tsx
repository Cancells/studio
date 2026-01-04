'use client';

import { Building, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useInvestments } from '@/context/investment-context';
import { formatCurrency } from '@/lib/utils';
import { GoldBarIcon } from '@/components/icons';
import type { AssetType } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';

const AssetIcon = ({ type }: { type: AssetType }) => {
  const iconProps = { className: "h-6 w-6 text-muted-foreground" };
  if (type === 'gold') {
    return <GoldBarIcon {...iconProps} />;
  }
  return <Building {...iconProps} />;
};

export function InvestmentsList() {
  const { investments, assets, removeInvestment } = useInvestments();

  if (investments.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Investments</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                    <p>You haven&apos;t added any investments yet.</p>
                    <p>Click &quot;Add Investment&quot; to get started.</p>
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Investments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Asset</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Current Value</TableHead>
              <TableHead className="text-right">Total Gain/Loss</TableHead>
              <TableHead className="text-right">Gain/Loss %</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.map((investment) => {
              const asset = assets.find((a) => a.ticker === investment.assetTicker);
              if (!asset) return null;

              const quantity = investment.amount / investment.purchasePrice;
              const currentValue = quantity * asset.price;
              const gainLoss = currentValue - investment.amount;
              const gainLossPercent = (gainLoss / investment.amount) * 100;

              return (
                <TableRow key={investment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <AssetIcon type={asset.type} />
                        <div>
                            <div className="font-medium">{asset.name}</div>
                            <div className="text-xs text-muted-foreground">{asset.ticker}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>{investment.purchaseDate.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">{formatCurrency(investment.amount)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(currentValue)}</TableCell>
                  <TableCell className={`text-right font-medium ${gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatCurrency(gainLoss)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={gainLoss >= 0 ? 'default' : 'destructive'} className={`${gainLoss >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {gainLossPercent.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => removeInvestment(investment.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
