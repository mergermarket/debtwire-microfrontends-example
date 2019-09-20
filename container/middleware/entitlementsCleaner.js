const {DEBTWIRE_IDS} = require('../constants')

module.exports = (req, res, next) => {
  req.subscriptions = req.entitlements.Tags
    .map(tag => tag.Key)
    .filter(id => DEBTWIRE_IDS.includes(id))
    .join(',')
  next()
}
