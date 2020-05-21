const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'me',
  port: 5432,
})
const getStudents = (request, response) => {
  pool.query('SELECT * FROM students ORDER BY studentid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getStudentById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM students WHERE studentid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getGradesById = (request, response) => {
    const id = parseInt(request.param.id)

    pool.query('SELECT * FROM grades WHERE studentid= $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}

const createStudent = (request, response) => {
  const { firstname, lastname, email } = request.body

  pool.query('INSERT INTO students (firstname, lastname, email) VALUES ($1, $2, $3)', [firstname, lastname, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Student added with ID: ${results.studentid}`)
  })
}

const updateStudent = (request, response) => {
  const id = parseInt(request.params.id)
  const { firstname, lastname, email } = request.body

  pool.query(
    'UPDATE students SET firstname = $1, lastname = $2, email = $3 WHERE studentid = $4',
    [firstname, lastname, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Student modified with ID: ${id}`)
    }
  )
}

const deleteStudent = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM students WHERE studentid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Student deleted with ID: ${id}`)
  })
}

module.exports = {
  getStudents,
  getStudentById,
  getGradesById,
  createStudent,
  updateStudent,
  deleteStudent,
}