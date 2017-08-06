
var User = require('../models/user')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

var register = (req, res) => {
  const saltRounds = 10
  let salt = bcrypt.genSaltSync(saltRounds)
  let hash = bcrypt.hashSync(req.body.password, salt)
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
  })
  user.save()
  .then(created => {
    res.send(created)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

var login = (req, res) => {
  User.findOne({ email: req.body.email })
  .then(found => {
    if (!found) {
      res.status(401).send(`email doesn't exist`)
    } else {
      let pass = bcrypt.compareSync(req.body.password, found.password)
      if (pass) {
        let token = jwt.sign({
          name: found.name,
          email: found.email,
          role: found.role
        }, process.env.SECRET)
        res.send(token)
      } else {
        res.status(401).send(`password wrong`)
      }
    }
  })
  .catch(err => {
    res.send(500).send(err)
  })
}

var loginFB = (req, res) => {
  User.findOne({ email: req.body.email })
  .then(found => {
    if (!found) {
      res.status(401).send(`email doesn't exist`)
    } else {
      let pass = bcrypt.compareSync(req.body.password, found.password)
      if (pass) {
        let token = jwt.sign({
          name: found.name,
          email: found.email,
          role: found.role
        }, process.env.SECRET)
        res.send(token)
      } else {
        res.status(401).send(`password wrong`)
      }
    }
  })
  .catch(err => {
    res.send(500).send(err)
  })
}

var getAll = (req, res) => {
  User.find({})
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err))
}

var getOne = (req, res) => {
  User.findById(req.params.id)
  .then(user => res.send(user))
  .catch(err => res.status(500).send(err))
}

var remove = (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(removed => res.send(removed))
  .catch(err => res.status(500).send(err))
}

var update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updated => res.send(updated))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  register, login, getAll, getOne, remove, update
}
