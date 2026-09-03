'use server';
/**
 * @fileOverview An AI agent that recommends a Heike Hosting plan based on user's website needs.
 *
 * - recommendHeikeHostingPlan - A function that handles the hosting plan recommendation process.
 * - AiPlanRecommenderInput - The input type for the recommendHeikeHostingPlan function.
 * - AiPlanRecommenderOutput - The return type for the recommendHeikeHostingPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiPlanRecommenderInputSchema = z.object({
  websiteDescription: z
    .string()
    .describe("A detailed description of the user's website needs, including website type, expected traffic, and required features."),
});
export type AiPlanRecommenderInput = z.infer<typeof AiPlanRecommenderInputSchema>;

const AiPlanRecommenderOutputSchema = z.object({
  recommendedPlan: z.string().describe("The name of the Heike Hosting plan recommended based on the user's needs."),
  space: z.string().describe("The storage space included with the recommended plan, e.g., '5 GB'."),
  price: z.string().describe("The annual price of the recommended plan, e.g., 'S/ 60'."),
  reasoning: z.string().describe("A detailed explanation of why this specific plan was recommended for the user's website needs."),
  features: z.array(z.string()).describe("A list of key features included in the recommended plan."),
});
export type AiPlanRecommenderOutput = z.infer<typeof AiPlanRecommenderOutputSchema>;

export async function recommendHeikeHostingPlan(input: AiPlanRecommenderInput): Promise<AiPlanRecommenderOutput> {
  return aiPlanRecommenderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPlanRecommenderPrompt',
  input: { schema: AiPlanRecommenderInputSchema },
  output: { schema: AiPlanRecommenderOutputSchema },
  prompt: `You are an expert sales assistant for Heike Hosting, specializing in recommending the best hosting plans to potential customers based on their specific website needs. Your goal is to help the user find the most suitable annual hosting plan from the following options:

Heike Hosting Plans (Specifications):
- Plans from 5GB up to 100GB: 2 GB RAM, 2 CPU.
- Plans from 150GB and above: 3 GB RAM, 3 CPU.

1.  **Plan: Básico**
    *   Espacio: 5 GB
    *   Precio: S/ 60
    *   Características: 2 GB RAM, 2 CPU, Certificados SSL gratis, Softaculous Premium, Emails ilimitados, Constructor web, Soporte 24/7
2.  **Plan: Intermedio**
    *   Espacio: 7 GB
    *   Precio: S/ 90
    *   Características: 2 GB RAM, 2 CPU, Certificados SSL gratis, Softaculous Premium, Emails ilimitados, Constructor web, Soporte 24/7
3.  **Plan: Pro**
    *   Espacio: 10 GB
    *   Precio: S/ 120
    *   Características: 2 GB RAM, 2 CPU, Certificados SSL gratis, Softaculous Premium, Emails ilimitados, Constructor web, Soporte 24/7
4.  **Plan: Plus**
    *   Espacio: 20 GB
    *   Precio: S/ 180
    *   Características: 2 GB RAM, 2 CPU, Certificados SSL gratis, Softaculous Premium, Emails ilimitados, Constructor web, Soporte 24/7
5.  **Plan: Business**
    *   Espacio: 50 GB
    *   Precio: S/ 300
    *   Características: 2 GB RAM, 2 CPU, Certificados SSL gratis, Softaculous Premium, Emails ilimitados, Constructor web, Soporte 24/7
6.  **Plan: Enterprise**
    *   Espacio: 100 GB
    *   Precio: S/ 500
    *   Características: 2 GB RAM, 2 CPU, Certificados SSL gratis, Softaculous Premium, Emails ilimitados, Constructor web, Soporte 24/7
7.  **Plan: Ultra**
    *   Espacio: 150 GB
    *   Precio: S/ 750
    *   Características: 3 GB RAM, 3 CPU, Certificados SSL gratis, Softaculous Premium, Emails ilimitados, Constructor web, Soporte 24/7
8.  **Plan: Ultimate**
    *   Espacio: 200 GB
    *   Precio: S/ 900
    *   Características: 3 GB RAM, 3 CPU, Certificados SSL gratis, Softaculous Premium, Emails ilimitados, Constructor web, Soporte 24/7

The user has described their website needs as follows:
{{{websiteDescription}}}

Please analyze this description and recommend the single most suitable Heike Hosting plan. Provide your recommendation in the specified JSON format, making sure to include the exact plan name, space, price, a detailed reasoning, and a list of key features from the plan. Ensure the features list accurately reflects the plan's offerings.`,
});

const aiPlanRecommenderFlow = ai.defineFlow(
  {
    name: 'aiPlanRecommenderFlow',
    inputSchema: AiPlanRecommenderInputSchema,
    outputSchema: AiPlanRecommenderOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
