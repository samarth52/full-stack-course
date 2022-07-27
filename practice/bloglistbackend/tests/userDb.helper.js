const User = require('../models/user')

const retrieveUsers = async () => {
  const users = await User.find({})
  return users
}

const initialUsers = [
  {
    _id: '62e11aa06bf6c1290d7326b9',
    username: 'root',
    name: 'root',
    password: 'alkshd1087aGJsh1bA',
  },
]

module.exports = {
  retrieveUsers, initialUsers,
}
