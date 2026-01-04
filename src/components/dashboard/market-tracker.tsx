'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useInvestments } from '@/context/investment-context';
import { formatCurrency } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Badge } from '../ui/badge';

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
    <Card className='bg-transparent border-0 shadow-none'>
      <CardHeader className='p-0'>
        <CardTitle className='text-lg font-bold'>Market Tracker</CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-4 h-[300px] overflow-y-auto">
        <div className='flex flex-col gap-2'>
            {filteredAssets.map((asset) => (
                 <div key={asset.ticker} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
                    <div>
                        <div className="font-bold">{asset.name}</div>
                        <div className="text-sm text-muted-foreground">{asset.ticker}</div>
                    </div>
                    <div className='text-right'>
                        <div className="font-bold">{formatCurrency(asset.price)}</div>
                        <div className={`text-sm font-medium ${asset.change >= 0 ? 'text-primary' : 'text-destructive'}`}>
                            {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
