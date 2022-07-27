/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { id: 1, name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, like } = request.body

  const decoded = jwt.verify(request.token, SECRET)
  if (!decoded.id) {
    return response.status(401).json({ error: 'invalid token passed' })
  }

  const user = await User.findById(decoded.id)
  const blog = new Blog({
    title,
    author,
    url,
    like,
    user: user._id,
  })
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  return response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json('object deleted')
})

blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes }, { runValidators: true, context: 'query' })
  response.status(204).json('object updated')
})

module.exports = blogsRouter
