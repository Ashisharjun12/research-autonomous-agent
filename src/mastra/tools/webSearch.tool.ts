import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { searchWeb } from '@/infrastructure/scraping/tavily.client.js'

const tavilySearchInputSchema = z.object({
    query: z.string().describe('Search query'),
    maxResults: z.number().min(1).max(10).optional().default(5),
})

const tavilySearchOutputSchema = z.object({
    results: z.array(
        z.object({
            title: z.string(),
            url: z.string(),
            content: z.string().optional(),
        }),
    ),
    answer: z.string().optional(),
})

export const tavilySearchTool = createTool({
    id: 'tavily-search',
    description:
        'Search the web for recent articles and sources. Returns titles, URLs, snippets, and an optional summary answer.',
    inputSchema: tavilySearchInputSchema,
    outputSchema: tavilySearchOutputSchema,
    execute: async ({ query, maxResults }, { abortSignal }) =>
        searchWeb(query, { maxResults, abortSignal }),
})
