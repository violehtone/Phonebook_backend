const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

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

app.get('/info', (request, response) => {
    const currentTime = new Date()
    const information = `Phonebook has info for ${persons.length} people`
    const result = information.concat("<br />", currentTime.toString())

    response.send(result)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    }else{
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = persons.length > 0 
        ? Math.max(...persons.map(n => n.id)) 
        : 0
    return maxId + 1
}

//Exercise 3.5
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

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    response.json(person)
})

// exercise 3.4
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})