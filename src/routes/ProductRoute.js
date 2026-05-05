import express from 'express';
import { ProductController } from '../controllers/ProductController.js';

const router = express.Router();
const controller = new ProductController();

router.get('/products', (req, res) => controller.index(req, res));
router.post('/products', (req, res) => controller.create(req, res));
router.put('/products/:id', (req, res) => controller.update(req, res));
router.delete('/products/:id', (req, res) => controller.delete(req, res));
router.get('/products/filter', (req, res) => controller.find(req, res));

export default router;  