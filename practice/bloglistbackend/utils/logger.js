/* eslint-disable no-console */
require('dotenv').config()

const message = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  console.log(...params)
}

module.exports = {
  message, error,
}
