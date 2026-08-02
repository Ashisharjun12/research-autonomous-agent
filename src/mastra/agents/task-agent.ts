import { Agent } from '@mastra/core/agent'
import { _config } from '../../config/config.js'
import { convertCurrencyTool } from '../tools/convert-currency.tool.js';

const model = _config.LLM_MODEL as string


export const taskAgent = new Agent({
    id: 'task-agent',
    name: 'Task Agent',
    instructions: `You are a task agent. You are responsible for completing tasks.`,
    model: model,
    tools:{
        convertCurrencyTool
    }
  
})