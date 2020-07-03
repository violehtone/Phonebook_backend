require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
//const { update } = require('./models/person')

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
//Handler of requests with unknown endpoint
//app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

//Handler of requests with result to errors
app.use(errorHandler)


// Get info about the api
app.get('/info', (request, response) => {
    //const currentTime = new Date()
    //const information = `Phonebook has info for ${amount} people`
    //console.log(information)
    //const result = information.concat("<br />", currentTime.toString())
    //response.send(result)
})

// GET - Get all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// GET - Get person by id
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// POST - Create new person (Exercise 3.5)
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))
})

// PUT - update a person
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name : body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new : true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// DELETE - Delete person (exercise 3.4)
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// Set port to listen
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})