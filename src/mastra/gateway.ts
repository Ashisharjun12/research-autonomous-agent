import { MastraModelGateway, type ProviderConfig } from '@mastra/core/llm'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { _config } from '../config/config.js'

export class UniversalGateway extends MastraModelGateway {
  readonly id = 'universal'
  readonly name = 'Universal Gateway'

  async fetchProviders(): Promise<Record<string, ProviderConfig>> {
    return {
      main: {
        name: 'main',
        models: [_config.LLM_MODEL as string],
        apiKeyEnvVar: _config.LLM_API_KEY as string,
        gateway: this.id,
        url: _config.LLM_BASE_URL as string,
      },
    }
  }

  buildUrl(): string {
    const url = _config.LLM_BASE_URL as string
    if (!url) throw new Error('Missing LLM_BASE_URL in .env')
    return url
  }

  async getApiKey(): Promise<string> {
    const key = _config.LLM_API_KEY as string
    if (!key) throw new Error('Missing LLM_API_KEY in .env')
    return key
  }


  async resolveLanguageModel({ modelId, providerId, apiKey }: {
    modelId: string; providerId: string; apiKey: string
  }) {
    return createOpenAICompatible({
      name: providerId,
      apiKey,
      baseURL: this.buildUrl(),
    }).chatModel(modelId) as any
  }
}

export const universalGateway = new UniversalGateway()