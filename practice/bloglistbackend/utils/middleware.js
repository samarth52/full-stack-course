const logger = require('./logger')

const recordRequest = (request, response, next) => {
  logger.message('Method:', request.method)
  logger.message('Path  :', request.path)
  logger.message('Body  :', request.body)
  logger.message('---')

  next()
}

const unknownEndpoint = (request, response) => {
  logger.error(`unknown endpoint: ${request.path}`)
  response.status(404).json({ error: `unknown endpoint: ${request.path}` })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted error' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  recordRequest, unknownEndpoint, errorHandler,
}
