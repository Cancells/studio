'use client';

import { useUser, useAuth, useMemoFirebase } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, doc, Firestore } from 'firebase/firestore';
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

  const usersCollectionRef = useMemoFirebase(() => {
    if(!firestore) return null;
    return collection(firestore, 'users');
  }, [firestore])

  useEffect(() => {
    if (user && userDocRef && usersCollectionRef) {
        // We'll use a non-blocking write to create the user document
        // if it doesn't exist.
        addDocumentNonBlocking(usersCollectionRef, {
            id: user.uid,
            email: user.email || '',
            fullName: user.displayName || 'Anonymous User',
            createdAt: new Date().toISOString(),
        });
    }
  }, [user, userDocRef, usersCollectionRef]);

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
