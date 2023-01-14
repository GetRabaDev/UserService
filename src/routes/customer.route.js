const express = require('express');
const { verify } = require('../middleware/verifyToken');
const { signUpValidate } = require('../validations/user.validations');
const {
  getUserDetails,
  listAllUsers,
  updateUser,
} = require('../controller/user.controller');

const router = express.Router();

router.use(verify);

// learning
router.get('/details/:user_id', getUserDetails);

router.get('/list-all', listAllUsers);

router.patch('/update-user/:user_id', updateUser);

module.exports = router;
