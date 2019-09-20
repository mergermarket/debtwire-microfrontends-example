import { StatsD } from 'node-statsd'
import config from './config'
import createLogger from './logger'
import R from 'ramda'

const log = createLogger(module)

let statsd
if (config.get('statsd.enabled')) {
  const statsdConfig = buildStatsdConfig()
  statsd = new StatsD(statsdConfig)
  log.info('Metrics collection is enabled. STATSD config: ', statsdConfig)
} else {
  statsd = buildDummyStatsdObject()
  log.info('Metrics collection is disabled.')
}

statsd.trackHttpResponseTime = trackHttpResponseTime
statsd.trackHttpErrorResponse = trackHttpErrorResponse

function trackHttpResponseTime ({ responseTime, httpCallee }) {
  const tags = joinKeysAndValues(['http_callee', httpCallee])
  statsd.histogram('http_client.response_time_ms', responseTime, tags)
}

function trackHttpErrorResponse ({ httpCallee }) {
  const tags = joinKeysAndValues(['http_callee', httpCallee])
  statsd.increment('http_client.response_error', 1, 1, tags)
}

function buildStatsdConfig () {
  return {
    host: config.get('statsd.host'),
    port: config.get('statsd.port'),
    prefix: 'app.',
    global_tags: [
      'env:' + config.get('env') || 'unknown-env',
      'component:' + config.get('componentName')
    ]
  }
}

function buildDummyStatsdObject () {
  return {
    histogram: (...parameters) => {
      const params = Array.prototype.slice.call(parameters || [])
      params.unshift('statsd disabled, stubbing histogram with params')
      log.debug.apply(log, params)
    },
    increment: (...parameters) => {
      const params = Array.prototype.slice.call(parameters || [])
      params.unshift('statsd disabled, stubbing increment with params')
      log.debug.apply(log, params)
    },
    gauge: (...parameters) => {
      const params = Array.prototype.slice.call(parameters || [])
      params.unshift('statsd disabled, stubbing gauge with params')
      log.debug.apply(log, params)
    }
  }
}

function joinKeysAndValues (keysAndValues) {
  if (keysAndValues.length % 2 !== 0) throw new Error('there are not an even number of keys and values')

  const output = []
  const chunks = groupsOf(2, keysAndValues)

  for (const chunk in chunks) {
    if (Object.prototype.hasOwnProperty.call(chunks, chunk)) {
      output.push([chunks[chunk][0], chunks[chunk][1]].join(':'))
    }
  }
  return output
}

const groupsOf = R.curry(function group (n, list) {
  return R.isEmpty(list) ? [] : R.prepend(R.take(n, list), group(n, R.drop(n, list)))
})

export default statsd
