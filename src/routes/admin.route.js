const express = require('express');
const { signUpValidate } = require('../validations/user.validations');
const {
  createListingCategory, deleteListingCategory
} = require('../controller/admin.controller');
const router = express.Router();

router.post('/create-category', createListingCategory);

router.delete('/delete-category', deleteListingCategory);


module.exports = router;
