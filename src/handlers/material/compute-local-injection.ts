import { getIconContent } from './get-icon-content'
import { computeLocalIconTemplate } from './compute-local-icon-template'
import { computeInjection } from '../compute-injection'

export const computeLocalInjection = computeInjection(getIconContent, computeLocalIconTemplate)