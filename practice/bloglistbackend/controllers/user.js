const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    id: 1, title: 1, author: 1, url: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body
  if (password.length < 3) {
    return response.status(400).json('password should be at least 3 characters long')
  }
  const user = new User({
    username,
    name,
    passwordHash: await bcrypt.hash(password, 10),
  })

  const result = await user.save()
  return response.status(201).json(result)
})

module.exports = usersRouter
