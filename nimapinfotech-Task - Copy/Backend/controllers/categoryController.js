const Category = require('../models/category');

// Get all categories
exports.getCategories = (req, res) => {
    Category.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// Add a new category
exports.addCategory = (req, res) => {
    const { name } = req.body;
    Category.add(name, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(results);
    });
};

// Update a category by ID
exports.updateCategory = (req, res) => {
    const { id } = req.params;  // Get category ID from URL params
    const { name } = req.body;  // Get category name from request body

    // Validate inputs
    if (!id || !name) {
        return res.status(400).json({ error: 'Category ID and name are required' });
    }

    Category.update(id, name, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category updated successfully', data: results });
    });
};

// Delete a category by ID
exports.deleteCategory = (req, res) => {
    const { id } = req.params;  // Get category ID from URL params

    // Validate input
    if (!id) {
        return res.status(400).json({ error: 'Category ID is required' });
    }

    Category.delete(id, (err, results) => {  // No need for `name` parameter here
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    });
};
