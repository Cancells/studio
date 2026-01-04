'use server';

/**
 * @fileOverview A flow for generating a personalized monthly investment summary.
 *
 * - generateMonthlySummary - A function that generates a monthly investment summary.
 * - MonthlySummaryInput - The input type for the generateMonthlySummary function.
 * - MonthlySummaryOutput - The return type for the generateMonthlySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MonthlySummaryInputSchema = z.object({
  investmentData: z.string().describe('A JSON string containing the user investment data for the month, including investment amounts, purchase dates, asset types, and performance data.'),
});
export type MonthlySummaryInput = z.infer<typeof MonthlySummaryInputSchema>;

const MonthlySummaryOutputSchema = z.object({
  summary: z.string().describe('A personalized summary of the user investment performance for the month, including key gains, losses, and overall trends.'),
});
export type MonthlySummaryOutput = z.infer<typeof MonthlySummaryOutputSchema>;

export async function generateMonthlySummary(input: MonthlySummaryInput): Promise<MonthlySummaryOutput> {
  return monthlySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'monthlySummaryPrompt',
  input: {schema: MonthlySummaryInputSchema},
  output: {schema: MonthlySummaryOutputSchema},
  prompt: `You are an expert financial advisor who provides personalized monthly investment summaries.

  Based on the following investment data for the month:

  {{investmentData}}

  Provide a concise and easy-to-understand summary of the user's investment performance, highlighting key gains, losses, and overall trends. Focus on providing actionable insights that will help the user improve their investment strategy. Tailor the summary to the user's specific investment portfolio and goals.
  `,
});

const monthlySummaryFlow = ai.defineFlow(
  {
    name: 'monthlySummaryFlow',
    inputSchema: MonthlySummaryInputSchema,
    outputSchema: MonthlySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
