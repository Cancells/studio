'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import { useEffect, useState } from 'react';

const emailOtpSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

const actionCodeSettings = {
    url: typeof window !== 'undefined' ? `${window.location.origin}/` : 'http://localhost:9002/',
    handleCodeInApp: true,
};

export function EmailOtpForm({ signIn }: { signIn: boolean }) {
  const auth = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [emailForSignIn, setEmailForSignIn] = useState('');

  const form = useForm<z.infer<typeof emailOtpSchema>>({
    resolver: zodResolver(emailOtpSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    const savedEmail = window.localStorage.getItem('emailForSignIn');
    if (savedEmail) {
      setEmailForSignIn(savedEmail);
    }
    if (isSignInWithEmailLink(auth, window.location.href) && savedEmail) {
      signInWithEmailLink(auth, savedEmail, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          toast({
            title: 'Successfully signed in!',
            description: 'You will be redirected shortly.',
          });
          router.push('/');
        })
        .catch((error) => {
          toast({
            variant: 'destructive',
            title: 'Failed to sign in with email link.',
            description: error.message,
          });
        });
    }
  }, [auth, router, toast]);

  async function onSubmit(values: z.infer<typeof emailOtpSchema>) {
    try {
      await sendSignInLinkToEmail(auth, values.email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', values.email);
      toast({
        title: 'Check your email',
        description: `A sign-in link has been sent to ${values.email}.`,
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not send sign-in link.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Send Sign-in Link
        </Button>
      </form>
    </Form>
  );
}
