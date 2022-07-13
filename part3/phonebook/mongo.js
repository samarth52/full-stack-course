const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
  console.log('Invalid number of arguments!')
  process.exit(1)
}

const password = process.argv[2]
url = `mongodb+srv://samarth52:${password}@phonebookcluster.y1cjj4c.mongodb.net/phoneApp?retryWrites=true&w=majority`
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Phone = mongoose.model('Phone', phoneSchema)

if (process.argv.length == 3) {
  Phone.find({}).then(records => {
    console.log("phonebook:")
    records.forEach(record => {
      console.log(`${record['name']} ${record['number']}`)
    })
    mongoose.connection.close()
  })
} else {
  const newPhone = new Phone({
    name: process.argv[3],
    number: process.argv[4]
  })

  newPhone.save().then(response => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}