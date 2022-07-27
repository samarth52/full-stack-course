const User = require('../models/user')

const retrieveUsers = async () => {
  const users = await User.find({})
  return users
}

const initialUsers = [
  {
    username: 'root',
    name: 'root',
    password: 'alkshd1087aGJsh1bA',
  },
]

module.exports = {
  retrieveUsers, initialUsers,
}
