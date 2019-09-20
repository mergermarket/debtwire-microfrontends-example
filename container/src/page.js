const scriptTag = (bundleUrl) => `<script src="${bundleUrl}"></script>`

const page = ({
  title,
  headerContent,
  pageContent,
  scripts
}) => `
  <html>
    <head>
      <title>${title}</title>
      <link href="https://cdn.mmgcache.net/debtwire-common-assets/4.11.8/css/debtwire-screen.css" rel="stylesheet" type="text/css">
    </head>
    <body>
      ${headerContent}
      ${pageContent}
      ${scripts.map(scriptTag).join('\n')}
    </body>
  </html>
`
module.exports = page


