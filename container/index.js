const express = require('express')
const URL = require('url')
const request = require('request-promise')
const fetch = require('isomorphic-unfetch')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const authenticate = require('./middleware/authenticate')
const entitlements = require('./middleware/entitlements')
const entitlementsCleaner = require('./middleware/entitlementsCleaner')

const microservice = require('./src/microservice')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(authenticate)
app.use(entitlements)
app.use(entitlementsCleaner)


app.get('/intelligence/view/:intelMmgid', microservice(({intelMmgid}) => `http://localhost:5000/intelligence/view/${intelMmgid}`))
app.get('/search', microservice(() => `http://localhost:4000/search-page`))


app.listen(3000, () => {
  console.log('server started on port 3000')
})

