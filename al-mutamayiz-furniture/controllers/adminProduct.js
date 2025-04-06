const Product = require('../models/Product');

// Get all products for admin
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Create new product
exports.createProduct = async (req, res) => {
    const { name_ar, name_en, description_ar, description_en, price, stock, category_id } = req.body;

    try {
        const newProduct = await Product.create({
            name_ar,
            name_en,
            description_ar,
            description_en,
            price,
            stock,
            category_id,
            images: req.body.images || []
        });

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update(updates);
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};