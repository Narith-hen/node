import User from '../models/User.js';
import { BaseController } from './baseController.js';

export class UserController extends BaseController {
  // GET all users
  async index(req, res) {
    try {
      const users = await User.getAll();
      this.success(res, 200 ,"Users retrieved successfully", users);
    } catch (err) {
      this.error(res, err.message, 500);
    }
  }

  // CREATE user
  async create(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    try {
      const result = await User.create(name);
      this.success(res, 201, "User created successfully", { id: result.insertId, name });
    } catch (err) {
      this.error(res, err.message, 500);
    }
  }

  // UPDATE user
  async update(req, res) {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    try {
      const user = await User.getById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await User.update(id, name);
      this.success(res, 200, "User updated successfully", { id, name });
    } catch (err) {
        this.error(res, err.message, 500);
    }
  }

  // DELETE user
  async delete(req, res) {
    const { id } = req.params;

    try {
      const user = await User.getById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await User.delete(id);
       this.success(res, 200, "User deleted successfully");
    } catch (err) {
      this.error(res, err.message, 500);
    }
  }
}
