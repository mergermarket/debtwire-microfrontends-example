const express = require('express')

const app = express()

app.get('/search-page', (req, res) => {
  res.json({
    html: '<div>This came from the search microfrontend!</div>',
    bundleUrl: 'http://localhost:4000/bundle.js'
  })
})

app.get('/bundle.js', (req, res) => {
  res.sendFile(`${__dirname}/bundle.js`)
})

app.listen(4000, () => {
  console.log('server started on port 4000')
})

