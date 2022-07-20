const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()
const Phone = require("./models/phoneMongo")

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.format('custom', (tokens, request, response) => {
  if (request.method === 'POST') {
    return morgan.compile(`:method :url :status :res[content-length] - :response-time ms ${JSON.stringify(request.body)}`)(tokens, request, response)
  } else {
    return morgan.compile(':method :url :status :res[content-length] - :response-time ms')(tokens, request, response)
  }
})
app.use(morgan('custom'))

app.get('/info', (request, response) => {
  Phone.count()
    .then(count => {
      response.send(
        `<div>
          <p>Phonebook has info for ${count} people</p>
          <p>${new Date()}</p>
        </div>`
      )
    })
})

app.get('/api/persons', (request, response) => {
  Phone.find({})
    .then(phones => {
      console.log(`retrieved ${phones.length} records`)
      response.json(phones)
    })
    .catch(err => {
      response.statusMessage = `Error retrieving records: ${err}`
      response.status(404).end()
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Phone.findById(id)
    .then(phone => {
      console.log(`retrieving record with id ${id}`)
      response.json(phone)
    })
    .catch(err => {
      console.log(`error retrieving record with id ${id} (not found)`)
      response.status(404).end()
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(() => {
      response.statusMessage - 'ID successfully deleted!'
      response.status(204).end()
    })
    .catch(err => {
      response.statusMessage = `error deleting record with id ${request.params.id} (not found)`
      response.status(404).end()
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ error: 'name is missing' })
  } else if (!body.number) {
    return response.status(400).json({ error: 'number is missing' })
  } 
  
  Phone.find({ name: body.name })
    .then(phones => {
      if (phones.length !== 0) {
        return response.status(400).json({ error: 'name must be unique' })
      }
      const newPhone = new Phone({
        name: body.name,
        number: body.number
      })
    
      newPhone.save()
        .then(() => {
          console.log('Entered new record into the db')
          response.json(newPhone)
        })
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`running server on port ${PORT}`)
})