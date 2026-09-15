import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  timeout: 5000,
  maxRetries: 1,
  perspective: "published",
})
