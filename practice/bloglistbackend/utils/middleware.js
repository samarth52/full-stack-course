const logger = require('./logger')

const recordRequest = (request, response, next) => {
  logger.message('Method:', request.method)
  logger.message('Path  :', request.path)
  logger.message('Body  :', request.body)
  logger.message('---')

  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  next()
}

const unknownEndpoint = (request, response) => {
  logger.error(`unknown endpoint: ${request.path}`)
  response.status(404).json({ error: `unknown endpoint: ${request.path}` })
}

const errorHandler = (error, request, response, next) => {
  logger.error(`${error.name}: ${error.message}`)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted error' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.message.indexOf('duplicate key error') !== -1) {
    return response.status(400).json({ error: 'username already exists' })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  return next(error)
}

module.exports = {
  recordRequest, tokenExtractor, unknownEndpoint, errorHandler,
}
