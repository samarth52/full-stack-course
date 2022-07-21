const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs)
    })
})

notesRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.status(200).json(result)
    })
})

module.exports = notesRouter
