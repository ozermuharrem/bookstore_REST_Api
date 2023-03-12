const express = require('express');
const authController = require('../controller/authController');
const checkJwt = require('../middlewares/authMiddlewares');

const router = express.Router();


router.route('/').post(authController.login);

module.exports = router;
