require('@babel/register')
const React = require('react')
const ReactDomServer = require('react-dom/server')
const express = require('express')
const fetch = require('isomorphic-unfetch')
const App = require('./src/App').default

const app = express()

app.get('/intelligence/view/:intelMmgid', (req, res) => {
  const url = `https://aslive-intelligence-store.dev.mmgapi.net/v2/intelligence/${req.params.intelMmgid}?${entitlements(req.query.entitlements)}`
  fetch(url)
    .then(result => result.json())
    .then(intel => {
      const appHtml = ReactDomServer.renderToString(React.createElement(App, intel))
      res.json({
        html: `<div id="intel-container">${appHtml}</div>${addPropsScript(intel)}`,
        bundleUrl: 'http://localhost:5000/bundle.js'
      })
    })
  // add props to window?
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(`${__dirname}/dist/bundle.js`)
})

app.listen(5000, () => {
  console.log('server started on port 5000')
})

function entitlements (entitlements) {
  const colonSeparatedEntitlements = entitlements.split(',').join(':')
  return `entitlements=${colonSeparatedEntitlements}`
}

function addPropsScript (intel) {
  return `<script>window.intelProps = ${JSON.stringify(intel)}</script>`
}
