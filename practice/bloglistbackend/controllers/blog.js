const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

notesRouter.post('/', async (request, response) => {
  const result = await new Blog(request.body).save()
  response.status(201).json(result)
})

notesRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json('object deleted')
})

notesRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes }, { runValidators: true, context: 'query' })
  response.status(204).json('object updated')
})

module.exports = notesRouter
