import { Agent } from '@mastra/core/agent'
import { _config } from '../../config/config.js'
import { researchMemory } from '../memory.js'
// import { saveArtifactTool } from '../tools/save-artifact.tool.js'  // when R2 tool exists

const model = _config.LLM_MODEL as string

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
  model,
  memory: researchMemory,
  // tools: { saveArtifactTool },  // Phase 2 when R2 tool is ready
})