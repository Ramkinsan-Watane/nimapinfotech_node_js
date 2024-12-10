const db = require('../config/db');

const Product = {
    getAll: (page, pageSize, callback) => {
        // Calculate the offset based on the page and page size
        const offset = (page - 1) * pageSize;

        // Run the query with pagination
        db.query(
            `SELECT p.id, p.name AS productName, c.name AS categoryName, c.id AS categoryId 
             FROM products p
             JOIN categories c ON p.category_id = c.id
             LIMIT ? OFFSET ?`,
            [Number(pageSize), Number(offset)], // Ensure pageSize and offset are numbers
            callback
        );
    },
    add: (name, category_id, callback) => {
        db.query('INSERT INTO products (name, category_id) VALUES (?,?)', [name, category_id], callback);
    },

    update: (id, name, callback) => {
        db.query('UPDATE products SET name = ? WHERE id = ?', [name, id], callback); // Fixed SQL syntax
    },
    delete: (id, name, callback) => {
        db.query('DELETE FROM products WHERE id = ? AND name = ?', [id, name], callback); // Fixed SQL syntax
    }
};

module.exports = Product;
