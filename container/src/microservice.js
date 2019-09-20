const page = require('./page')

const fromJson = result => result.json()

const render = (res) => ([
  {html: headerContent, bundleUrl: headerBundleUrl },
  {html: pageContent, bundleUrl: pageBundleUrl, title = 'missing title' }
]) => {
  const fullHtml = page({
    title,
    headerContent,
    pageContent,
    scripts: [
      headerBundleUrl,
      pageBundleUrl
    ]
  })
  res.send(fullHtml)
}


const microservice = (urlFunc) => (req, res, next) => {
  const resourceUrl = new URL(urlFunc(req.params))
  resourceUrl.searchParams.append('entitlements', req.subscriptions)

  const headerUrl = `http://localhost:4001/header?entitlements=${req.subscriptions}`

  Promise.all([
    fetch(headerUrl).then(fromJson),
    fetch(resourceUrl.toString()).then(fromJson)
  ])
  .then(render(res))
  .catch(err => {
    console.error(err)
    res.status(500)
    res.send(err)
  })
}

module.exports = microservice
