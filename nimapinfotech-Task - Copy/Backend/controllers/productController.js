const Product = require('../models/product');

exports.getProducts = (req, res) => {
    let { page = 1, pageSize = 10 } = req.query;
    page = parseInt(page); // Ensure page is an integer
    pageSize = parseInt(pageSize); // Ensure pageSize is an integer

    // Call the Product model's getAll function
    Product.getAll(page, pageSize, (err, products, totalCount) => {
        if (err) return res.status(500).send({ error: 'Internal Server Error' });

        // Calculate total number of pages based on the total count
        const totalPages = Math.ceil(totalCount / pageSize);

        // Send the results along with total count and total pages for frontend pagination
        res.json({
            products,
            totalCount,
            totalPages,
            currentPage: page,
            pageSize: pageSize
        });
    });
};

exports.addProduct = (req, res) => {
    const { name, category_id } = req.body; // Changed 'categoryId' to 'category_id'

    // Validate inputs
    if (!name || !category_id) {
        return res.status(400).json({ error: 'Product name and category are required' });
    }

    Product.add(name, category_id, (err, results) => {
        if (err) return res.status(500).send({ error: 'Internal Server Error' });
        res.status(201).json({ message: 'Product added successfully', productId: results.insertId });
    });
};

exports.updateProduct = (req, res) => {
    const { id } = req.params; // Get product ID from the URL
    const { name } = req.body; // Get product name from the body

    // Validate inputs
    if (!id || !name) {
        return res.status(400).json({ error: 'Product ID and name are required' });
    }

    Product.update(id, name, (err, results) => {
        if (err) return res.status(500).send({ error: 'Internal Server Error' });
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params; // Get product ID from the URL

    // Validate input
    if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    Product.delete(id, (err, results) => { // No need for 'name' parameter here
        if (err) return res.status(500).send({ error: 'Internal Server Error' });
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
};
