import { IconRegistry } from './IconRegistry'

import { mockExtractor } from './mockExtractor'
import { mockExtractorSync } from './mockExtractorSync'

type iconType = import('./Icon').iconType

type extractorType = import('./IconRegistry').extractorType
type extractorSyncType = import('./IconRegistry').extractorSyncType
type iconExtractTryType = import('./IconRegistry').iconExtractTryType

export {
    IconRegistry,
    mockExtractorSync,
    mockExtractor,
    extractorType,
    extractorSyncType,
    iconExtractTryType,
    iconType
}
