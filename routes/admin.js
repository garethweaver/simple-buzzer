const { teams } = require('../config/config')

module.exports = app => {
  app.get('/admin', (req, res) => {
    const reject = () => {
      res.setHeader('www-authenticate', 'Basic')
      res.sendStatus(401)
    }

    const { authorization } = req.headers

    if (!authorization) {
      return reject()
    }

    const [username, password] = Buffer.from(
      authorization.replace('Basic ', ''),
      'base64'
    ).toString().split(':')

    if (!(username === process.env.ADMIN_NAME && password === process.env.ADMIN_PASS)) {
      return reject()
    }

    res.render('admin', { title: 'Admin', teams })
  })
}
