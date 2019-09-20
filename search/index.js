require('@babel/register')
const React = require('react')
const ReactDomServer = require('react-dom/server')
const express = require('express')
const App = require('./src/App').default

const app = express()

app.get('/search-page', (req, res) => {
  res.json({
    html: `<div id="search-container">${ReactDomServer.renderToString(React.createElement(App))}</div>`,
    bundleUrl: 'http://localhost:4000/bundle.js'
  })
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(`${__dirname}/dist/bundle.js`)
})

app.listen(4000, () => {
  console.log('server started on port 4000')
})

