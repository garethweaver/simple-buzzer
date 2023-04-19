module.exports = app => {
  app.get('/display', (req, res) => {
    res.render('display', { title: 'BUZZ' })
  })
}
