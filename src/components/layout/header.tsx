'use client';

import { AppLogo } from '@/components/icons';
import { AddInvestmentDialog } from '../dashboard/add-investment-dialog';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <AppLogo className="h-8 w-8 text-primary" />
        <h1 className="text-lg font-bold text-foreground">Portfolio</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <AddInvestmentDialog />
      </div>
    </header>
  );
}
