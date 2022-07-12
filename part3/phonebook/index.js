const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.format('custom', (tokens, request, response) => {
  if (request.method === 'POST') {
    return morgan.compile(`:method :url :status :res[content-length] - :response-time ms ${JSON.stringify(request.body)}`)(tokens, request, response)
  } else {
    return morgan.compile(':method :url :status :res[content-length] - :response-time ms')(tokens, request, response)
  }
})
app.use(morgan('custom'))

let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  response.send(
    `<div>
      <p>Phonebook has info for ${phonebook.length} people</p>
      <p>${new Date()}</p>
    </div>`
)})

app.get('/api/persons', (request, response) => {
  console.log(`retrieved ${phonebook.length} records`)
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const phone = phonebook.find(record => record.id === id)
  if (phone) {
    console.log(`retrieving record with id ${id}`)
    response.json(phone)
  } else {
    console.log(`error retrieving record with id ${id} (not found)`)
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  if (phonebook.find(record => record.id === id)) {
    console.log(`deleting record with id ${id}`)
    phonebook = phonebook.filter(record => record.id !== id)
    response.status(204).end()
  } else {
    console.log(`error deleting record with id ${id} (not found)`)
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ error: 'name is missing' })
  } else if (!body.number) {
    return response.status(400).json({ error: 'number is missing' })
  } else if (phonebook.find(phone => phone.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }
  console.log('hi')
  const newPhone = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number
  }
  console.log('entering record', newPhone)
  phonebook = phonebook.concat(newPhone)
  response.json(newPhone)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`running server on port ${PORT}`)
})