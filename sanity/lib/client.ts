import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token:
    "skJchKSMbyPux9IMu4K9CC5YOAXUyVBbRsJ0lqcCgZV3lDSK2VKNzde8ydrbSroawtOQPO9X3o3qc6T9pYvz9McA73QqeIbalHUTEaYQSkPFHuqSDCIJuMxCW3koWbFZi03nCCLBh0YGz48JuWDIRj4fParuMXwr5Dgf0eTBUitF21l92322",
})
