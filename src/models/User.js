import pool from '../config/db.js';

class User {
  // Get all users
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM acc');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  // Get user by ID
  static async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM acc WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  // Create user
  static async create(name) {
    try {
      const [result] = await pool.query(
        'INSERT INTO acc (name) VALUES (?)',
        [name]
      );
      return result;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Update user
  static async update(id, name) {
    try {
      const [result] = await pool.query(
        'UPDATE acc SET name = ? WHERE id = ?',
        [name, id]
      );
      return result;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  // Delete user
  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM acc WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default User;
