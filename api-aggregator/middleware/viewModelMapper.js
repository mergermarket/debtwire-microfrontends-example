import { URL } from 'url'

import buildLegacyLinksFactory from '../services/buildLegacyLinks'
import createCommonAssetsUrls from '../commonAssetsUrls'
import webAnalyticsHelper from '../services/webAnalyticsHelper'
import fetchCookieGuid from '../services/cookieHelper'
import versions from '../services/versionsHelper'
import { getUserId } from '../services/utils'

export default function viewModelMapper (config) {
  const buildLegacyLinks = buildLegacyLinksFactory(config)
  const commonAssetsUrls = createCommonAssetsUrls(config)

  return function (req, res, next) {
    const xForwardedFor = req.headers['x-forwarded-for']
    const hHost = req.headers.host
    const webAnalyticsData = webAnalyticsHelper(xForwardedFor, null, hHost, req.url)
    const subscribedEditions = buildLegacyLinks(req.subscriptions, fetchCookieGuid(req.cookies))
    const entitlements = req.subscriptions.split(',')
    const guid = fetchCookieGuid(req.cookies)
    const env = config.environmentName

    req.viewModel = {
      WebAnalytics: {
        webAnalyticsTrackerJs: new URL('/web-analytics/js/web-analytics-tracker.js', config.webAnalyticsBaseUrl).toString(),
        baseUrl: config.webAnalyticsBaseUrl,
        data: webAnalyticsData
      },
      userId: getUserId(req),
      assetLocation: config.assetLocationPrefix + config.assetVersion,
      subscribedEditions: subscribedEditions,
      piwikSiteId: config.piwikSiteId,
      commonAssetsUrls: commonAssetsUrls.commonAssetsUrlForScreen,
      imagesUrls: commonAssetsUrls.imagesUrl,
      faviconUrls: commonAssetsUrls.faviconUrl,
      jQueryUrl: commonAssetsUrls.jQueryUrl,
      entitlements,
      subscriptionTags: req.entitlements.SubscriptionTags.map(t => t.Key),
      guid,
      env,
      versions
    }

    next()
  }
}
