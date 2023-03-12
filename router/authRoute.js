const express = require('express');
const authController = require('../controller/authController');
const checkJwt = require('../middlewares/authMiddlewares');

const router = express.Router();

router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logoutUser);
router.route('/:_id').delete(authController.deleteUser);

module.exports = router;
