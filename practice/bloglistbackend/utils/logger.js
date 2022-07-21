/* eslint-disable no-console */
const message = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.log(...params)
}

module.exports = {
  message, error,
}
