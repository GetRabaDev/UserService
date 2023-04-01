const express = require('express');
const { signUpValidate } = require('../validations/user.validations');
const {
  customerLogin,
  customerSignUp,
  verifyOtp,
  registerPhone,
  verifyPhone
} = require('../controller/auth.controller');
const router = express.Router();

router.post('/signup', customerSignUp);
router.post('/login', customerLogin);
router.post('/verify-otp', verifyOtp);
router.post('/register-phone', registerPhone)
router.post('/verify-phone', verifyPhone)


module.exports = router;
