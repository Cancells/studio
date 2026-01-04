'use client';

import { useUser, useAuth, useMemoFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AuthManager({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthPage = pathname === '/signin' || pathname === '/signup';
    if (!isUserLoading && !user && !isAuthPage) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth, pathname]);

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  useEffect(() => {
    if (user && userDocRef) {
        setDocumentNonBlocking(userDocRef, {
            id: user.uid,
            email: user.email || '',
            fullName: user.displayName || (user.isAnonymous ? 'Anonymous User' : ''),
            createdAt: user.metadata.creationTime || new Date().toISOString(),
        }, { merge: true });
    }
  }, [user, userDocRef]);

  const isAuthPage = pathname === '/signin' || pathname === '/signup';

  if ((isUserLoading || !user) && !isAuthPage) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <Loader className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Signing in...</p>
      </div>
    );
  }

  return <>{children}</>;
}
