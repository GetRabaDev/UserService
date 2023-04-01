const { CustomerRepo } = require('./customer.table');
const { AuthOtpRepo } = require('./authotp.table.js');
const {ListingCategoryRepo} = require('./listingCategories.table')

const userRepo = new CustomerRepo();

module.exports = {
  userRepo,
  authOtpRepo: AuthOtpRepo,
  ListingCategoryRepo
};
