import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { fetchPage } from '@/infrastructure/scraping/scrape-do.client.js'

//input schema
const fetchUrlInputSchema = z.object({
    url: z.string().url().describe('HTTP or HTTPS URL to fetch'),
    render: z
        .boolean()
        .optional()
        .default(false)
        .describe('Use headless browser rendering for JavaScript-heavy pages'),
})
//output schema
const fetchUrlOutputSchema = z.object({
    url: z.string(),
    content: z.string(),
    truncated: z.boolean(),
})



export const fetchUrlTool = createTool({
    id: 'fetch-url',
    description:
        'Fetch and extract readable markdown content from a URL using Scrape.do (handles anti-bot pages).',
    inputSchema: fetchUrlInputSchema,
    outputSchema: fetchUrlOutputSchema,
    execute: async ({ url, render }, { abortSignal }) =>
        fetchPage(url, { render, abortSignal }),
})
