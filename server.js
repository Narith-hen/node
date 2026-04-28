import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import pool from './src/config/db.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Test database connection
app.get('/test', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    res.json({ status: 'MySQL connected successfully!' });
  } catch (error) {
    res.status(500).json({ error: `MySQL connection failed: ${error.message}` });
  }
});

app.use('/', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
