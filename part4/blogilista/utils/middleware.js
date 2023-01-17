const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  logger.error(error.message)
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  }
  request.decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !request.decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  next()
}

const userExtractor = async (request, _response, next) => {
  if (request.decodedToken) {
    request.user = await User.findById(decodedToken.id)
  }
  next()
}
  
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}