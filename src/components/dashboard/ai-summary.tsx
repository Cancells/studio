'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInvestments } from '@/context/investment-context';
import { getAiSummary } from '@/app/actions';
import { Wand2, Loader } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

export function AiSummary() {
  const { investments } = useInvestments();
  const [summary, setSummary] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleGenerateSummary = () => {
    startTransition(async () => {
      const result = await getAiSummary(investments);
      setSummary(result);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          <span>AI Investment Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-[150px]">
        {isPending ? (
          <div className="flex h-full items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <ScrollArea className="h-[150px]">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {summary || 'Click the button to generate a personalized summary of your recent investment performance.'}
            </p>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateSummary} disabled={isPending} className="w-full">
          {isPending ? 'Generating...' : 'Generate Monthly Summary'}
        </Button>
      </CardFooter>
    </Card>
  );
}
