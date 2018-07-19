const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')

const { secret } = require('./../config/secret')

let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minLength: 4,
    unique: true
  },
  password: {
    type: String,
    minLength: 6,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.statics.findByCredentials = function (username, password) {
  return this.findOne({username}).then(user => {
    if (!user) Promise.reject(new Error('No user found'))

    return user
  })
}

UserSchema.statics.findByToken = function (token) {
  let decoded

  try {
    decoded = jwt.verify(token, secret)
  } catch (e) {
    return Promise.reject(e)
  }

  return this.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.methods.toJSON = function () {
  let userObject = this.toObject()
  const { _id, username, currentGame } = userObject
  return { _id, username, currentGame }
}

UserSchema.methods.generateAuthToken = function () {
  let access = 'auth'
  let token = jwt.sign({_id: this._id.toHexString(), access}, secret).toString()

  this.tokens.push({access, token})

  return this.save().then(() => {
    return token
  })
}

let User = model('User', UserSchema)

module.exports = { User }
