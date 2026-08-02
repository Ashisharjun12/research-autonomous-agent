import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import axios from 'axios';



//input schema
const convertCurrencyInputSchema = z.object({
    amount: z.number(),
    from: z.string(),
    to: z.string(),
})

//output schema
const convertCurrencyOutputSchema = z.object({
    amount: z.number(),
    from: z.string(),
    to: z.string(),
})


//execute function
async function executeConvertCurrency(input: z.infer<typeof convertCurrencyInputSchema>, {abortSignal}:{abortSignal?: AbortSignal}) {
    const {amount, from, to} = input;
    const response = await axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`, {
        signal: abortSignal,
    });
    return response.data;
}

//tools
export const convertCurrencyTool = createTool({
    id: 'convert-currency',
    description: 'Convert a currency to another currency',
    inputSchema: convertCurrencyInputSchema,
    outputSchema: convertCurrencyOutputSchema,
    execute:executeConvertCurrency
})