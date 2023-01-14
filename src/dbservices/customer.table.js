const User = require('../models/User');

class CustomerRepo {
  customerCreate = async (data) => {
    const customer = await new User(data).save();
    return customer;
  };

  update = async (_id, data) => {
    const update = await User.findOneAndUpdate(
      { _id },
      { ...data },
      { returnDocument: 'after' }
    );
    return update;
  };

  findCustomer = async (condition) => {
    const user = await User.findOne(condition);
    return user;
  };

  findAll = async (condition) => {
    const user = await User.find(condition);
    return user;
  };

  searchCustomerByEmail = async (email) => {
    const users = await User.find({ email: { $regex: '.*' + email + '.*' } });
    return users;
  };
}

module.exports = {
  CustomerRepo,
};
