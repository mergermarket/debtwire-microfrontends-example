const express = require('express')
const Header = require('debtwire-react-header').default
const React = require('react')
const ReactDomServer = require('react-dom/server')
const fetch = require('isomorphic-unfetch')

//const App = require('./src/App.jsx')

const app = express()

const query = `query {
  user {
    userId,
    acurisUserId,
    subscriptions
  }
}`;


app.get('/header', (req, res) => {
  const header = React.createElement(Header, {
    actionItems: [],
    secondaryLinks: [],
    subscriptionTags: [],
    dwDomain: 'local.debtwire.com',
    env: 'aslive',
    entitlements: req.query.entitlements.split(','),
    activeRoute: req.query.activeRoute,
    userMenuProps: {}
  })

  html = ReactDomServer.renderToString(header)

  return res.json({
    html: `<div id="header-container">${html}</div>`,
    bundleUrl: 'http://localhost:4001/bundle.js'
  })
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(`${__dirname}/dist/bundle.js`)
})

app.listen(4001, () => {
  console.log('server started on port 4001')
})
