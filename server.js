import express from 'express'
import mysql from 'mysql2/promise'


const app = express()
app.use(express.json())

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',        
  password: '', 
  database: 'user_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})


app.get('/', (req, res) => {
  res.send('Hello Narith!')
})

let users = []
//list
app.get('/users', async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const [rows] = await connection.query('SELECT * FROM acc ')
    connection.release()
    res.send(rows)
  } catch (error) {
    res.status(500).send({ message: 'Database error', error: error.message })
  }
})

// Create user
app.post('/users', async (req, res) => {
  try {
    const connection = await pool.getConnection()
    await connection.query('INSERT INTO acc (name) VALUES (?)', [req.body.name])
    const [rows] = await connection.query('SELECT * FROM acc WHERE name = ?', [req.body.name])
    connection.release()
    res.status(201).send(rows[0])
  } catch (error) {
    res.status(500).send({ message: 'Database error', error: error.message })
  }
}); 

// update
app.put('/users/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection()
    await connection.query('UPDATE acc SET name = ? WHERE id = ?', [req.body.name, req.params.id])
    const [rows] = await connection.query('SELECT * FROM acc WHERE id = ?', [req.params.id])
    connection.release()
    res.send(rows[0])
  } catch (error) {
    res.status(500).send({ message: 'Database error', error: error.message })
  }
})

// delete
app.delete('/users/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection()
    await connection.query('DELETE FROM acc WHERE id = ?', [req.params.id])
    connection.release()
    res.send({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Database error', error: error.message })
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})