import express from 'express';
import { UserController } from '../controllers/UserControllers.js';

const router = express.Router();
const controller = new UserController();

router.get('/users', (req, res) => controller.index(req, res));
router.post('/users', (req, res) => controller.create(req, res));
router.put('/users/:id', (req, res) => controller.update(req, res));
router.delete('/users/:id', (req, res) => controller.delete(req, res));

export default router;
