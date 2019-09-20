const express = require('express')
//const Header = require('debtwire-react-header')
const React = require('react')
const ReactDomServer = require('react-dom/server')
const fetch = require('isomorphic-unfetch')

const app = express()

const query = `query {
  user {
    userId,
    acurisUserId,
    subscriptions
  }
}`;


app.get('/header', (req, res) => {
  fetch('http://local.debtwire.com:3001/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query
    })
  })
  .then(r => r.json())
  .then(data => {

    res.json({
      html: `<div>${data.subscriptions}</div>`,
      bundleUrl: 'http://localhost:4000/bundle.js'
    })
  })
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(`${__dirname}/bundle.js`)
})

app.listen(4001, () => {
  console.log('server started on port 4001')
})

