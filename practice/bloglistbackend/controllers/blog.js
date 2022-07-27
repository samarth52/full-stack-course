/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { id: 1, name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { body, user } = request

  if (!user) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  return response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { user } = request
  if (!user) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({ error: 'invalid id' })
  }
  if (blog.user._id.toString() !== user.id.toString()) {
    return response.status(403).json({ error: 'blog cannot be deleted by non-owners' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { user } = request
  if (!user) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({ error: 'invalid id' })
  }
  if (blog.user._id.toString() !== user.id.toString()) {
    return response.status(403).json({ error: 'blog cannot be updated by non-owners' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true, runValidators: true, context: 'query' },
  )
  return response.json(updatedBlog)
})

module.exports = blogsRouter
