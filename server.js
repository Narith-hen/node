import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// create pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_db'
});

// test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// GET users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM acc');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE user
app.post('/users', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO acc (name) VALUES (?)',
      [name]
    );

    res.status(201).json({
      id: result.insertId,
      name
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE user
app.put('/users/:id', async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query(
      'UPDATE acc SET name = ? WHERE id = ?',
      [name, req.params.id]
    );

    res.json({ id: req.params.id, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
app.delete('/users/:id', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM acc WHERE id = ?',
      [req.params.id]
    );

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});