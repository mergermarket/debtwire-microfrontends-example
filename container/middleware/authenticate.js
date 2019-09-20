const AuthClient = require('mmg-authentication-service-client')

const DEBTWIRE_PRODUCT_ID = 8

const statsd = {
  trackHttpResponseTime: () => {},
  trackHttpErrorResponse: () => {},
  increment: () => {}
}

const authOptions = {
    loginUrl: "https://aslive-www.debtwire.com/login",
    logoutUrl: "https://aslive-www.debtwire.com/auth/services/auth/logout?redirectUrl=https://aslive-www.debtwire.com/",
    cookieDomain: ".debtwire.com",
    authenticationServiceBaseUrl: "https://aslive-authentication.dev.mmgapi.net",
    jwtAuthenticationServiceBaseUrl: "https://aslive-jwt-authentication.dev.mmgapi.net",
    httpTimeoutMs: 2000,
    logger: console.log,
    statsd: statsd,
    onError: onAuthError,
    useAuthIdentitySuccessUrl: true,
    componentName: 'debtwire-container',
    productID: DEBTWIRE_PRODUCT_ID,
    userIdCookieEnabled: true,
    env: 'aslive'
}

function onAuthError (err, req, res) {
    console.debug('Error while authenticating user')
    console.error(err)
}

const middleware = AuthClient.getAuthenticationMiddleware(authOptions)

module.exports = middleware
