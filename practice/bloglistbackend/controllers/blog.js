const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { id: 1, name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const result = await new Blog({ ...request.body, user: '62e11aa06bf6c1290d7326b9' }).save()
  response.status(201).json(result)
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
