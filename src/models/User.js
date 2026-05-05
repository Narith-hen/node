import pool from '../config/db.js';
import BaseModel from './BaseModel.js';

class User extends BaseModel {

  // Get all users
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM acc');
    return rows;
  }

  // Get user by ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM acc WHERE id = ?', [id]);
    return rows[0];
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

  //Find User
  static async find(filters) {
    let query = 'SELECT * FROM acc WHERE 1 = 1';
    const values = [];

    //Filter user name
    if (filters.name) {
      query += ' AND name LIKE ?';
      values.push(`%${filters.name}%`);
    }

    const [rows] = await pool.query(query, values);
    return rows;
  }
}

export default User;
