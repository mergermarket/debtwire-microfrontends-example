const express = require('express')
const request = require('request-promise')

const template = `
  <html>
    <body>
      <h1>Debtwire Header</h1>
      <main><!--SEARCH--></main>
      <!--BUNDLESCRIPT-->
    </body>
  </html>`
const app = express()

app.get('/', (req, res) => {
  request({
    uri: 'http://localhost:4000/search-page',
    json: true
  })
    .then(({ html, bundleUrl }) => {
      const fullHtml = template
        .replace('<!--SEARCH-->', html)
        .replace('<!--BUNDLESCRIPT-->', bundleScript(bundleUrl))

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

