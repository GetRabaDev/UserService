const Listings = require('../models/Listings');

class ListingRepo {
  static create = async (data) => {
    const res = await new Listings(data).save();
    return res;
  };

  static update = async (_id, data) => {
    const update = await Listings.findOneAndUpdate(
      { _id },
      { ...data },
      { returnDocument: 'after' }
    );
    return update;
  };

  static find = async (condition) => {
    const user = await Listings.findOne(condition);
    return user;
  };

  static findAll = async (condition, paginate = false, paginateOptions) => {
    if(paginate){
     const listings = await Listings.paginate(condition, paginateOptions)
     return listings;
    }
    const user = await Listings.find(condition);
    return user;
  };

  searchCustomerByEmail = async (name) => {
    const users = await Listings.find({
      name: { $regex: '.*' + name + '.*' },
    });
    return users;
  };

  static _delete = async(condition) => {
    await Listings.deleteOne(condition)
    return;
  }
}

module.exports = {
    ListingRepo,
};
