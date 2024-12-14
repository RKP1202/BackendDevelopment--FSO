// console.log('Hello World');
const http = require('http')
const express = require('express');
const { error } = require('console');
const app = express();
app.use(express.json())

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(persons));
// })

// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// })  

// ROUTES
app.get('/api/persons', (request, response) => {
    response.json(persons);
})


app.get('/info', (request, response) => {
    const date = new Date();
    const personsCount = persons.length;
    response.send(`Phonebook has info for ${personsCount} people. <br> <br
        > ${date}`);
})

//Single Resource
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find((person) => {
        return person.id === id;
    })

    response.json(person);
})

//DEleting single resource
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find((person) => {
        return person.id === id;
    })

    persons = persons.filter(person => person.id !== id);
    if (person) {

        response.status(204).end();
    } else {
        response.status(404).send({ error: 'Person not found' });
    }
})


// Creating a new Resource
app.post('/api/persons', (request, response) => {
    const person = request.body;
    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        });
    }

    const isDuplicate = persons.find((p) => {
        return p.name === person.name;
    })

    if(isDuplicate){
        return response.status(400).json({
            error: 'Person with this name already exists'
            });
    }

    const newPerson = {
        name: person.name,
        number: person.number,
        id: Math.floor(Math.random() * 1000)
    }
    persons = persons.concat(newPerson);
    response.json(newPerson);
})



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})