'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useAuth } from '@/firebase';
import Link from 'next/link';
import { User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function UserNav() {
  const { user } = useUser();
  const auth = useAuth();

  const handleSignOut = async () => {
    await auth.signOut();
  };
  
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user?.photoURL || userAvatar?.imageUrl}
              alt={user?.displayName || 'User'}
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {user && !user.isAnonymous ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.displayName || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuGroup>
            <Link href="/signin" passHref>
              <DropdownMenuItem>
                <LogIn className="mr-2" />
                <span>Sign In</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/signup" passHref>
              <DropdownMenuItem>
                <UserPlus className="mr-2" />
                <span>Sign Up</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
