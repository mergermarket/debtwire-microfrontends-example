const EntitlementsClient = require('mmg-entitlements-service-client')

//export default function ({ config, log, metrics }) {

const metrics = {
  trackHttpResponseTime: () => {},
  trackHttpErrorResponse: () => {},
  increment: () => {}
}

const entitlementsOptions = {
    logger: console,
    statsd: metrics,
    entitlementsServiceBaseUrl: "https://aslive-entitlements.dev.mmgapi.net",
    httpTimeoutMs: 2000,
    onError: onEntitlementsError
}

const entitlementsClient = EntitlementsClient(entitlementsOptions)

function onEntitlementsError (err, req, res) {
  console.debug('Error while getting user entitlements')
  console.error(err)
}


module.exports = (req, res, next) => {
  entitlementsClient(req, res, () => {
    if (!req.entitlements) {
      return res.status(500).send({ error: 'you have no entitlements' })
    }
    next()
  })
}
