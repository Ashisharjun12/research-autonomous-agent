import { Agent } from '@mastra/core/agent'
import { fetchUrlTool } from '../tools/fetchUrl.tool.js'
import { toolAgentModel } from '../model.js'

export const documentReaderAgent = new Agent({
    id: 'document-reader-agent',
    name: 'Document Reader Agent',
    description:
        'Fetches and extracts readable content from URLs using Scrape.do. Use after web search to deep-read sources.',
    instructions: `
        Fetch the requested URL(s) and return clean extracted text.
        Summarize key facts only from the fetched content — do not invent information.
        Include the source URL in your response.
    `,
    model: toolAgentModel,
    tools: {
        fetchUrlTool,
    },
})
