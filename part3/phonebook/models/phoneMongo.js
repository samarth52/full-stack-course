const mongoose = require('mongoose')

const url = process.env.MONGO_DB_URI
console.log("Connected to MongoDB database")
mongoose.connect(url)
  .then(() => console.log('Connected!'))
  .catch(err => console.log(`Error connecting: ${err}`))

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone', phoneSchema)

