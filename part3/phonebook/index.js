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

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  
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
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Phone.find({})
    .then(phones => {
      console.log(`retrieved ${phones.length} records`)
      response.json(phones)
    })
    .catch(error => {
      console.log(`Error retrieving records`)
      next(error)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phone.findById(id)
    .then(phone => {
      console.log(`retrieving record with id ${id}`)
      response.json(phone)
    })
    .catch(error => {
      console.log(`error retrieving record with id ${id} (not found)`)
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  Phone.findByIdAndUpdate(id, { number: body.number }, { runValidators: true, context: 'query' })
    .then(result => {
      console.log(`Phone number of record with id ${id} updated`)
      response.json({ ...result, number: body.number })
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.statusMessage = 'ID successfully deleted!'
        response.status(204).end()
      } else {
        console.log(`error deleting record with id ${request.params.id} (not found)`)
        response.status(400).end()
      }
    })
    .catch(error => {
      console.log(error.message)
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`running server on port ${PORT}`)
})