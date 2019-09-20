import React from 'react'
import ReactDom from 'react-dom'
import fetch from 'isomorphic-unfetch'
import Header from 'debtwire-react-header'

//import App from './App'

const query = `user { subscriptions }`

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
    console.log('initialising header')
    const props = {
      actionItems: [],
      secondaryLinks: [],
      subscriptionTags: [],
      dwDomain: 'local.debtwire.com',
      env: 'aslive',
      entitlements: data.subscriptions,
      activeRoute: window.location.pathname,
      userMenuProps: {}
    }
    ReactDom.hydrate(<Header {...props} />, document.getElementById('header-container'))
  })
