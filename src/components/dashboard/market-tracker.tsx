'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useInvestments } from '@/context/investment-context';
import { formatCurrency } from '@/lib/utils';
import { Search } from 'lucide-react';

export function MarketTracker() {
  const { assets } = useInvestments();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = useMemo(() => {
    return assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [assets, searchTerm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Tracker</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stocks or gold..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="h-[300px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow key={asset.ticker}>
                <TableCell>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-sm text-muted-foreground">{asset.ticker}</div>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(asset.price)}</TableCell>
                <TableCell className={`text-right ${asset.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {asset.change.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
