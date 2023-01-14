const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { userRepo } = require('../dbservices');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const { userDTO } = require('../DTOs/user.dto');

class CustomerService {
  getUserDetails = async (user_id) => {
    const user = await userRepo.findCustomer({ _id: user_id });
    abortIf(!user, httpStatus.NOT_FOUND, 'User Does not exist');
    return user;
  };

  updateUser = async (user_id, data) => {
    const user = await userRepo.update(user_id, data);
    return user;
  };

  listAllUsers = async () => {
    const users = await userRepo.findAll({});
    return users;
  };
}

module.exports = {
  CustomerService,
};
