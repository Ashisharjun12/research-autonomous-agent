import { Agent } from '@mastra/core/agent'
import { _config } from '../../config/config.js'
import { summarizerAgent } from './summarizer-agent.js';
import { reportWriterAgent } from './report-writter-agent.js';
import { researchMemory } from '../memory.js';
import { webSearchAgent } from './web-search-agent.js';

const model = _config.LLM_MODEL as string


export const researchAgent = new Agent({
    id: 'research-orchestrator',
    name: 'Research Orchestrator',
    description: 'Coordinates multi-step research by delegating to specialists.',
    instructions: `
    Plan research on the user's topic.
    Delegate web search to web-search-agent.
    Delegate summarization to summarizer-agent.
    Delegate final report to report-writer-agent.
    Synthesize and return a clear answer.
    `,
    model: model,
    agents:{
        webSearchAgent,
        summarizerAgent,
        reportWriterAgent,
    },
    memory: researchMemory,
  
})