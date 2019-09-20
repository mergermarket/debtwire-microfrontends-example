import expressFeatureFlagsMiddleware from 'express-feature-flags-middleware'
import allowedFeatureFlags from '../../infra/allowedFeatureFlags'

export default function ({ config, log, metrics }) {
  const featureFlagOptions = {
    allowedFeatureFlags,
    redisConnectionString: config.sheldonRedisConnectionString,
    redisKeyString: config.sheldonRedisKeyString,
    logger: log,
    statsd: metrics
  }

  return expressFeatureFlagsMiddleware(featureFlagOptions)
}
