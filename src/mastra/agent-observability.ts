import { Mastra } from '@mastra/core'
import { Observability } from '@mastra/observability'
import { LangSmithExporter } from '@mastra/langsmith'
import { _config } from '../config/config.js'

export const mastra = new Mastra({
  observability: new Observability({
    configs: {
      langsmith: {
        serviceName: 'research-agent',
        exporters: [
          new LangSmithExporter({
            apiKey: _config.LANGSMITH_API_KEY,
          }),
        ],
      },
    },
  }),
})