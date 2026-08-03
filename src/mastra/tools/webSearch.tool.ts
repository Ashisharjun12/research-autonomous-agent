import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import axios from 'axios';



//input schema
const webSearchInputSchema = z.object({
    amount: z.number(),
    from: z.string(),
    to: z.string(),
})  

//output schema
const webSearchOutputSchema = z.object({
    amount: z.number(),
    from: z.string(),
    to: z.string(),
})


//execute function
async function executeWebSearch(input: z.infer<typeof webSearchInputSchema>, {abortSignal}:{abortSignal?: AbortSignal}) {
    const {amount, from, to} = input;
    const response = await axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`, {
        signal: abortSignal,
    });
    return response.data;
}

//tools
export const webSearchTool = createTool({
    id: 'web-search',
    description: 'Search the web for information',
    inputSchema: webSearchInputSchema,
    outputSchema: webSearchOutputSchema,
    execute:executeWebSearch
})