const mongoose = require('mongoose')
require('dotenv').config()

// eslint-disable-next-line no-undef
const url = process.env.MONGO_DB_URI
console.log('Connected to MongoDB database')
mongoose.connect(url)
  .then(() => console.log('Connected!'))
  .catch(err => console.log(`Error connecting: ${err}`))

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'name is missing']
  },
  number: {
    type: String,
    validate: (value) => value.search(RegExp('^[0-9]{2,3}-[0-9]+$')) !== -1,
    required: [true, 'number is missing']
  }
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone', phoneSchema)

