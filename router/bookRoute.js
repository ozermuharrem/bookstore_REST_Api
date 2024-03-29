const express = require('express');
const bookController = require('../controller/bookController');
const checkJwt = require('../middlewares/authMiddlewares');

const router = express.Router();

router.route('/').get(bookController.getAllBooks);
router.route('/').post(checkJwt,bookController.createBook);
router.route('/:id').get(bookController.retrieveBook);
router.route('/:id').put(checkJwt,bookController.updateBook);
router.route('/:id').delete(checkJwt,bookController.deleteBook);





module.exports = router;
