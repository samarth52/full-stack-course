const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const app = express()

logger.message('Connecting to MongoDB')
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.message('MongoDB Connected!'))
  .catch((error) => logger.error(`Error connecting to MongoDB, ${error.message}`))

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use(middleware.recordRequest)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
