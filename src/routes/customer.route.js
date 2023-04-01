const express = require('express');
const { verify } = require('../middleware/verifyToken');
const { signUpValidate } = require('../validations/user.validations');
const {
  listingsController
} = require('../controller/user.controller');

const router = express.Router();

router.use(verify);

router.get('/all-listings', listingsController);

module.exports = router;
