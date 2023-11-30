const { teams } = require('../config/config')

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'BUZZ', teams })
  })
}
