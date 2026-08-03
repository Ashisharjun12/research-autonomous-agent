import { Agent } from '@mastra/core/agent'
import { researchMemory } from '../memory.js'
import { agentModel } from '../model.js'

export const summarizerAgent = new Agent({
  id: 'summarizer-agent',
  name: 'Summarizer Agent',
  description:
    'Summarizes research sources into clear section summaries with key points and citations.',
  instructions: `
    You receive raw sources or notes from research.
    Produce structured section summaries: key points, citations, no fluff.
    Do not invent facts not present in the input.
  `,
  model: agentModel,
  memory: researchMemory,
})
