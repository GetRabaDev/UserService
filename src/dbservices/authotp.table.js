const AuthOtp = require('../models/AuthOtp');

class AuthOtpRepo {
  static create = async (data) => {
    const res = await new AuthOtp(data).save();
    return res;
  };

  static update = async (_id, data) => {
    const update = await AuthOtp.findOneAndUpdate(
      { _id },
      { ...data },
      { returnDocument: 'after' }
    );
    return update;
  };

  static findOtp = async (condition) => {
    const user = await AuthOtp.findOne(condition);
    return user;
  };

  static findAll = async (condition) => {
    const user = await AuthOtp.find(condition);
    return user;
  };

  searchCustomerByEmail = async (email) => {
    const users = await AuthOtp.find({
      email: { $regex: '.*' + email + '.*' },
    });
    return users;
  };
}

module.exports = {
  AuthOtpRepo,
};
