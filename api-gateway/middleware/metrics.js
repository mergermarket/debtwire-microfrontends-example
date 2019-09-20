import connectDatadog from 'connect-datadog'

export default createMetricsMiddleware

function createMetricsMiddleware (statsd) {
  const datadogOptions = {
    dogstatsd: statsd,
    response_code: true,
    response_code_grouped: true,
    stat: 'web'
  }
  return connectDatadog(datadogOptions)
}
