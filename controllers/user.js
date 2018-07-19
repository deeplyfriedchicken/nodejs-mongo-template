let { User } = require('./../models/user')

function signup (req, res) {
  let { username, password } = req.body

  let user = new User({username, password})
  user.save().then(user => {
    return user.generateAuthToken()
  }).then(token => {
    const message = `Welcome, ${user.username}`
    res.send({
      message,
      token
    })
  }).catch(e => res.status(400).send(e))
}

function login (req, res) {
  let { username, password } = req.body

  User.findByCredentials(username, password).then(user => {
    if (!user) return Promise.reject(new Error(`Account ${username} not found. Please signup.`))
    user.generateAuthToken().then(token => {
      const message = `Welcome back, ${username}!`
      res.send({
        message,
        token
      })
    })
  }).catch(e => res.status(400).send({message: e.message}))
}

function currentUser (req, res) {
  res.send(req.user)
}

module.exports = {
  signup,
  login,
  currentUser
}
