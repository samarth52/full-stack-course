const { IS_TEST } = require('./config')

const info = (...params) => {
  if (!IS_TEST) {
    console.log(...params)
  }
}

const error = (...params) => {
  if (!IS_TEST) {
    console.error(...params)
  }
}

module.exports = {
  info, error
}