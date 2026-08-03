import axios from 'axios'
import { _config } from '@/config/config.js'

const SCRAPE_DO_BASE = 'https://api.scrape.do/'
const MAX_CONTENT_CHARS = 50000

export interface FetchPageOptions {
    render?: boolean
    abortSignal?: AbortSignal
    timeoutMs?: number
}

export interface FetchPageResult {
    url: string
    content: string
    truncated: boolean
}

function requireScrapeToken(): string {
    const token = _config.SCRAPER_API_KEY
    if (!token) {
        throw new Error('SCRAPER_API_KEY is missing from environment')
    }
    return token
}

function assertHttpUrl(url: string): void {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        throw new Error('Only http and https URLs are supported')
    }
}

export async function fetchPage(url: string, options: FetchPageOptions = {}): Promise<FetchPageResult> {
    assertHttpUrl(url)

    const token = requireScrapeToken()
    const params = new URLSearchParams({
        token,
        url,
        output: 'markdown',
    })

    if (options.render) {
        params.set('render', 'true')
    }

    const response = await axios.get(`${SCRAPE_DO_BASE}?${params.toString()}`, {
        signal: options.abortSignal,
        timeout: options.timeoutMs ?? 60000,
        responseType: 'text',
        validateStatus: (status) => status >= 200 && status < 300,
    })

    const raw =
        typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
    const truncated = raw.length > MAX_CONTENT_CHARS
    const content = truncated ? raw.slice(0, MAX_CONTENT_CHARS) : raw

    return { url, content, truncated }
}
