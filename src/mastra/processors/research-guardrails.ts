import { UnicodeNormalizer, PIIDetector } from '@mastra/core/processors'
import { guardrailModel } from '@/mastra/model.js'

const piiDetector = new PIIDetector({
    model: guardrailModel,
    strategy: 'redact',
    threshold: 0.6,
    detectionTypes: ['email', 'phone'],
    redactionMethod: 'mask',
})

export const orchestratorInputProcessors = [
    new UnicodeNormalizer({
        stripControlChars: true,
        collapseWhitespace: true,
    }),
    piiDetector,
]

export const orchestratorOutputProcessors = [
    new PIIDetector({
        model: guardrailModel,
        strategy: 'redact',
        threshold: 0.6,
        detectionTypes: ['email', 'phone'],
        redactionMethod: 'mask',
    }),
]
