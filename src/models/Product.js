import pool from '../config/db.js';
import BaseModel from './BaseModel.js';

class Product extends BaseModel {
    //Get all products
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    }

    //Get By ID
    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }
    
    //Create product
    static async create(name, description, price, quantity, category) {
        try {
        const [result] = await pool.query(
                'INSERT INTO products (name, description, price, quantity, category) VALUES (?, ?, ?, ?, ?)',
                [name, description, price, quantity, category]
            );

        return result;

        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    //Update products
    static async update(id, name, description, price, quantity, category) {
        try {
            const [result] = await pool.query(
                'UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, category = ? WHERE id = ?',
                [name, description, price, quantity, category, id]
            );
            return result;
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    //Delete product
    static async delete(id) {
        try {
            const [result] = await pool.query( 'DELETE FROM products WHERE id = ?', [id]);
            return result;
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    //Find Product
    static async find(filters) {
        let query = 'SELECT * FROM products WHERE 1 = 1';
        const  values = [];

        //Filter product name
        if (filters.name) {
            query += ' AND name LIKE ?';
            values.push(`%${filters.name}%`);
        }

        // Filters product price
        if (filters.price) {
            query += ' AND price <= ?';
            values.push(filters.price);
        }

        //Filters product category
        if (filters.category) {
            query += ' AND category = ?';
            values.push(filters.category);
        }

        const [rows] = await pool.query(query, values);
        return rows;
    }
}

export default Product;
