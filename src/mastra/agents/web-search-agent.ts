import { Agent } from '@mastra/core/agent'
import { toolAgentModel } from '../model.js'
import { tavilySearchTool } from '../tools/webSearch.tool.js'

export const webSearchAgent = new Agent({
    id: 'web-search-agent',
    name: 'Web Search Agent',
    instructions: 'Search for sources using tavily-search. Return structured citations only.',
    description: 'Searches the web and returns titles, URLs, and snippets with citations.',
    model: toolAgentModel,
    tools: {
        tavilySearchTool,
    },
})
