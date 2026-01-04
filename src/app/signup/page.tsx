'use client';

import Link from 'next/link';
import { AppLogo } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmailPasswordSignUpForm } from '@/components/auth/email-password-signup-form';
import { PhoneSignUpForm } from '@/components/auth/phone-signup-form';
import { EmailOtpForm } from '@/components/auth/email-otp-form';


export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <AppLogo className="h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
          <p className="text-muted-foreground">
            Start tracking your investments today.
          </p>
        </div>

        <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
                <TabsTrigger value="email-otp">Email OTP</TabsTrigger>
            </TabsList>
            <TabsContent value="password">
                <EmailPasswordSignUpForm />
            </TabsContent>
            <TabsContent value="phone">
                <PhoneSignUpForm />
            </TabsContent>
            <TabsContent value="email-otp">
                <EmailOtpForm signIn={false} />
            </TabsContent>
        </Tabs>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/signin" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}
