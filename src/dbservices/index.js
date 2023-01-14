const { CustomerRepo } = require('./customer.table');
const { AuthOtpRepo } = require('./authotp.table.js');

const userRepo = new CustomerRepo();

module.exports = {
  userRepo,
  authOtpRepo: AuthOtpRepo,
};
