require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log("---")
    next()
}

//app.use(requestLogger)
//const unknownEndpoint = (request, response) => {response.status(404).send({ error: 'unknown endpoint'})}
//app.use(unknownEndpoint)

let persons = [
    { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
    },
    { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
    },
    { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
    },
    { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
    }
]

// Get info about the api
app.get('/info', (request, response) => {
    const currentTime = new Date()
    const information = `Phonebook has info for ${persons.length} people`
    const result = information.concat("<br />", currentTime.toString())

    response.send(result)
})

// GET - Get all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// GET - Get person by id
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })


const generateId = () => {
    const maxId = persons.length > 0 
        ? Math.max(...persons.map(n => n.id)) 
        : 0
    return maxId + 1
}

// POST - Create new person (Exercise 3.5)
app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log(body)

    // Check that name and number are given
    if(!body.name || !body.number) {
        return reseponse.status(400).json({
            error: 'name or number missing'
        })
    }

    // Check that name doesn't already exist
    let duplicate = persons.some(person => person.name === body.name)
    if(duplicate) {
        return response.status(400).json({
            error: 'Name already exists in phonebook'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

// Delete person (exercise 3.4)
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// Set port to listen
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})