const express = require('express');
const bookController = require('../controller/bookController');

const router = express.Router();

router.route('/').get(bookController.getAllBooks);
router.route('/').post(bookController.createBook);
router.route('/:id').get(bookController.retrieveBook);
router.route('/:id').put(bookController.updateBook);




module.exports = router;
