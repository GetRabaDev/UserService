const express = require('express');
const { signUpValidate } = require('../validations/user.validations');
const {
  customerLogin,
  customerSignUp,
  verifyOtp,
} = require('../controller/auth.controller');
const router = express.Router();

router.post('/signup', customerSignUp);
router.post('/login', customerLogin);
router.post('/verify-otp', verifyOtp);

module.exports = router;
