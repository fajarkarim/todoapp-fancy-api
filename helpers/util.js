const jwt = require('jsonwebtoken');

var auth = (req, res) => {
  let token = req.headers.token
  let decode = jwt.verify(token, process.env.SECRET)
  if (!token) {
    res.status(401).send({ error: 'login first'})
  } else {
    if (!decode) {
      res.status(401).send({ error: 'you are not authorized' })
    } else {
      next()
    }
  }
}

module.exports = { auth }
