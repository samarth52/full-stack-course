// const http = require('http')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const { MONGODB_URI } = process.env
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((error) => console.log(error.message))

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.status(200).json(result)
    })
})

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
