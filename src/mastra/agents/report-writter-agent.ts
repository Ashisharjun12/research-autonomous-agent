import { Agent } from '@mastra/core/agent'
import { researchMemory } from '../memory.js'
import { agentModel } from '../model.js'

export const reportWriterAgent = new Agent({
  id: 'report-writer-agent',
  name: 'Report Writer Agent',
  description:
    'Writes a final markdown research report from summaries and sources.',
  instructions: `
    Write a well-structured markdown report: title, executive summary,
  sections with headings, citations, and conclusion.
    Use only information provided in the delegation prompt.
  `,
  model: agentModel,
  memory: researchMemory,
  // tools: { saveArtifactTool },  // Phase 2 when R2 tool is ready
})
