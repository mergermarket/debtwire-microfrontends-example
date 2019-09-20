const express = require('express')
const request = require('request-promise')
const fetch = require('isomorphic-unfetch')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const authenticate = require('./middleware/authenticate')
const entitlements = require('./middleware/entitlements')
const entitlementsCleaner = require('./middleware/entitlementsCleaner')

const template = `
  <html>
    <head>
      <title>Debtwire micro frontends</title>
      <link href="https://cdn.mmgcache.net/debtwire-common-assets/4.11.8/css/debtwire-screen.css" rel="stylesheet" type="text/css">
 
    </head>
    <body>
      <!--HEADER-->
      <main><!--PAGE-CONTENT--></main>
      <!--BUNDLESCRIPTS-->
    </body>
  </html>`

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(authenticate)
app.use(entitlements)
app.use(entitlementsCleaner)

const fromJson = result => result.json()

app.get('/search', (req, res) => {
  console.log({subscriptions: req.subscriptions})
  Promise.all([
    fetch(`http://localhost:4001/header?entitlements=${req.subscriptions}`).then(fromJson),
    fetch(`http://localhost:4000/search-page?entitlements=${req.subscriptions}`).then(fromJson)
  ])
    .then(([
      {html: headerHtml, bundleUrl: headerBundleUrl },
      {html: pageHtml, bundleUrl: pageBundleUrl }
    ]) => {
      const fullHtml = template
        .replace('<!--HEADER-->', headerHtml)
        .replace('<!--PAGE-CONTENT-->', pageHtml)
        .replace('<!--BUNDLESCRIPTS-->', [
          bundleScript(headerBundleUrl),
          bundleScript(pageBundleUrl)
        ].join('\n'))

      res.send(fullHtml)
    })
    .catch(err => {
      console.log(err)
    })
})

app.listen(3000, () => {
  console.log('server started on port 3000')
})

function bundleScript (bundleUrl) {
  return `<script src="${bundleUrl}"></script>`
}

