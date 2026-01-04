'use client';

import Image from 'next/image';
import { AppLogo } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AddInvestmentDialog } from '../dashboard/add-investment-dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Header() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <AppLogo className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold text-foreground">EGX Portfolio Tracker</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <AddInvestmentDialog />
        <Avatar className="h-9 w-9">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={userAvatar.description} data-ai-hint={userAvatar.imageHint} />}
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
