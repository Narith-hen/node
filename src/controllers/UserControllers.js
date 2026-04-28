import User from '../models/User.js';

export class UserController {
  // GET all users
  async index(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
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
      res.status(201).json({
        id: result.insertId,
        name
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
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
      res.json({ id, name });
    } catch (err) {
      res.status(500).json({ error: err.message });
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
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
