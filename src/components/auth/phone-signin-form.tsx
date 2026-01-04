'use client';

import { useState, useEffect } from 'react';
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
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';

const phoneSchema = z.object({
  phone: z.string().regex(/^\+201[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number (e.g., +201012345678).'),
});

const otpSchema = z.object({
    otp: z.string().min(6, 'OTP must be 6 digits.').max(6, 'OTP must be 6 digits.'),
});


export function PhoneSignInForm() {
  const auth = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    if (!auth || !('recaptchaVerifier' in window)) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': () => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
    }
    
    return () => {
        if ('recaptchaVerifier' in window) {
            window.recaptchaVerifier.clear();
        }
    }
  }, [auth]);
  

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '+20' },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });


  async function onPhoneSubmit(values: z.infer<typeof phoneSchema>) {
    if (!window.recaptchaVerifier) {
        toast({ title: "Recaptcha not initialized", variant: "destructive" });
        return;
    }
    try {
      const result = await signInWithPhoneNumber(auth, values.phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      setIsOtpSent(true);
      toast({
        title: 'OTP Sent!',
        description: 'An SMS with a verification code has been sent to your phone.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to send OTP.',
        description: error.message,
      });
      window.recaptchaVerifier.clear();
    }
  }

  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    if (!confirmationResult) {
        toast({ title: "Something went wrong.", description: "Please try sending the OTP again.", variant: "destructive" });
        return;
    }
    try {
        await confirmationResult.confirm(values.otp);
        toast({
            title: 'Success!',
            description: 'You have been signed in.',
          });
        router.push('/');
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Invalid OTP',
            description: 'The code you entered is incorrect. Please try again.',
          });
    }
  }


  if (isOtpSent) {
    return (
        <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4 pt-4">
                <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                        <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full">Verify & Sign In</Button>
                <Button variant="link" size="sm" className='w-full' onClick={() => setIsOtpSent(false)}>Back to phone number entry</Button>
            </form>
        </Form>
    )
  }

  return (
    <>
      <div id="recaptcha-container"></div>
      <Form {...phoneForm}>
        <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4 pt-4">
          <FormField
            control={phoneForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+201012345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Send OTP
          </Button>
        </form>
      </Form>
    </>
  );
}
