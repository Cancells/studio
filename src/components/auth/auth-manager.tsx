'use client';

import { useUser, useAuth, useMemoFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

export default function AuthManager({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  useEffect(() => {
    if (user && userDocRef) {
        // We'll use a non-blocking write to create/merge the user document.
        // This will create the document if it doesn't exist, or merge the
        // data if it does. This avoids security rule violations.
        setDocumentNonBlocking(userDocRef, {
            id: user.uid,
            email: user.email || '',
            fullName: user.displayName || 'Anonymous User',
            createdAt: new Date().toISOString(),
        }, { merge: true });
    }
  }, [user, userDocRef]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <Loader className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Signing in...</p>
      </div>
    );
  }

  return <>{children}</>;
}
