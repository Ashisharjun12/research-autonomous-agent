import { Agent } from '@mastra/core/agent'
import { _config } from '../../config/config.js'
import { webSearchTool } from '../tools/webSearch.tool.js';


const model = _config.LLM_MODEL as string

export const webSearchAgent = new Agent({
    id: 'web-search-agent',
    name: 'Web Search Agent',
    description: 'Searches the web and returns titles, URLs, and snippets with citations.',
    instructions: `Search for sources. Return structured citations only.`,
    model: model,
    tools: {
        webSearchTool
    },

})