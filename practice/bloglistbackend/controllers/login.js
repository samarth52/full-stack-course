/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const isCorrectPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!isCorrectPassword) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const toToken = {
    username,
    id: user._id,
  }

  const token = jwt.sign(toToken, SECRET)
  return response.status(200).json({ username, name: user.name, token })
})

module.exports = loginRouter
