const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Students API' })
})

app.get('/students', db.getStudents)
app.get('/students/:id', db.getStudentById)
app.get('/grades/:id', db.getGradesById)
app.post('/students', db.createStudent)
app.put('/students/:id', db.updateStudent)
app.delete('/users/:id', db.deleteStudent)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})