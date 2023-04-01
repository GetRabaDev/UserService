const { ListingRepo } = require('../dbservices/listings.table');

class CustomerService {
  static listings = async (data, paginate) => {
    const condition = {...data, public:true}
    const users = await ListingRepo.findAll(condition, true, paginate)
    return users;
  };
}

module.exports = CustomerService
