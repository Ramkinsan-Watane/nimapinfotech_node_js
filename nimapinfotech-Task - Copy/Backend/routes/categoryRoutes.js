const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const connection = require('../config/db');
router.get('/', categoryController.getCategories);
router.post('/', categoryController.addCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
