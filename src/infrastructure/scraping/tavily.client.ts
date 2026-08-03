import { tavily } from '@tavily/core'
import { _config } from '@/config/config.js'

const MAX_CONTENT_CHARS = 2000
const DEFAULT_MAX_RESULTS = 5
const DEFAULT_TIMEOUT_MS = 30000

export interface SearchWebOptions {
    maxResults?: number
    abortSignal?: AbortSignal
    timeoutMs?: number
}

export interface SearchWebResult {
    results: { title: string; url: string; content?: string }[]
    answer?: string
}

function requireTavilyApiKey(): string {
    const apiKey = _config.TRAVILY_WEB_SEARCH_API_KEY
    if (!apiKey) {
        throw new Error('TRAVILY_WEB_SEARCH_API_KEY is missing from environment')
    }
    return apiKey
}

function truncate(text: string | undefined, max = MAX_CONTENT_CHARS): string | undefined {
    if (!text) return undefined
    if (text.length <= max) return text
    return text.slice(0, max) + '...'
}

function getTavilyClient() {
    return tavily({ apiKey: requireTavilyApiKey() })
}

export async function searchWeb(query: string, options: SearchWebOptions = {}): Promise<SearchWebResult> {
    if (options.abortSignal?.aborted) {
        throw new Error('Tavily search aborted')
    }

    const maxResults = options.maxResults ?? DEFAULT_MAX_RESULTS
    const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS

    const client = getTavilyClient()
    const response = await client.search(query, {
        maxResults,
        includeAnswer: true,
        searchDepth: 'basic',
        timeout: timeoutMs / 1000,
    })

    if (options.abortSignal?.aborted) {
        throw new Error('Tavily search aborted')
    }

    return {
        results: response.results.map((r) => ({
            title: r.title,
            url: r.url,
            content: truncate(r.content),
        })),
        answer: response.answer,
    }
}
