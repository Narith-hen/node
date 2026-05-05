import { BaseController } from "./BaseController.js";
import Product from "../models/Product.js";

export class ProductController extends BaseController {
    //Get all products
    async index(req, res) {
        try {
            const products = await Product.getAll();
            this.success(res, 200, "Products retrieved successfully", products);
        } catch (err) {
            this.error(res, err.message, 500);
        }
    }

    // Create products
    async create(req, res) {
        const { name, description, price, quantity, category } = req.body;

        // validation
        if (!name || !description || price === undefined || quantity === undefined || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const result = await Product.create(name, description, price, quantity, category);

            this.success(res, 201, "Product created successfully", {
                id: result.insertId,
                name,
                description,
                price,
                quantity,
                category
            });

        } catch (err) {
            this.error(res, err.message, 500);
        }
    }

    //Update products
    async update(req, res) {
        const { name, description, price, quantity, category } = req.body;
        const {id} = req.params;

        if (!name || !description || price === undefined || quantity === undefined || !category){
            return res.status(400).json({ message: "All fields are required"});
        }

        try {
            const product = await Product.getById(id);
            // const result = await Product.update(name, description, price, quantity, category);
            if (!product) {
                return res.status(404).json({ message: 'Product not found. Please try again.'})
            }

            await Product.update(id, name, description, price, quantity, category);
            this.success(res, 200, "Product updated successfull", { 
                id,
                name, 
                description, 
                price, 
                quantity,
                category
            });
        } catch (err) {
            this.error(res, err.message, 500);
        }   
    }

    // Delete
    async delete(req, res) {
        const { id } = req.params;

        try {
            const product = await Product.getById(id);
            if (!product) {
                return res.status(404).json({message: 'Product not found'});
            }

            await Product.delete(id);
            this.success(res, 200, "Product deleted successfull");
        } catch (err) {
            this.error(res, err.message, 500);
        }
    }

    //filter product
    async find(req, res) {
        try {
            const products = await Product.find(req.query);
            this.success(res, 200, "Products retrieved successfully", products);
        } catch (err) {
            this.error(res, err.message, 500);
        }
    }

}
