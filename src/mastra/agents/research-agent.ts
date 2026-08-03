import { Agent } from '@mastra/core/agent'
import { summarizerAgent } from './summarizer-agent.js'
import { reportWriterAgent } from './report-writter-agent.js'
import { researchMemory } from '../memory.js'
import { webSearchAgent } from './web-search-agent.js'
import { documentReaderAgent } from './document-reader-agent.js'
import {
    orchestratorInputProcessors,
    orchestratorOutputProcessors,
} from '../processors/research-guardrails.js'
import { toolAgentModel } from '../model.js'

export const researchAgent = new Agent({
    id: 'research-orchestrator',
    name: 'Research Orchestrator',
    description: 'Coordinates multi-step research by delegating to specialists.',
    instructions: `
    Plan research on the user's topic.
    1. Delegate web search to web-search-agent to find sources.
    2. Delegate document-reader-agent to fetch and extract content from the best URLs.
    3. Delegate summarization to summarizer-agent.
    4. Delegate final report to report-writer-agent.
    Synthesize and return a clear answer with citations.
    `,
    model: toolAgentModel,
    agents: {
        webSearchAgent,
        documentReaderAgent,
        summarizerAgent,
        reportWriterAgent,
    },
    memory: researchMemory,
    inputProcessors: orchestratorInputProcessors,
    outputProcessors: orchestratorOutputProcessors,
})
