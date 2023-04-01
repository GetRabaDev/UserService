const ListingCategory = require('../models/ListingCategories');

class ListingCategoryRepo {
  static create = async (data) => {
    const res = await new ListingCategory(data).save();
    return res;
  };

  static update = async (_id, data) => {
    const update = await ListingCategory.findOneAndUpdate(
      { _id },
      { ...data },
      { returnDocument: 'after' }
    );
    return update;
  };

  static find = async (condition) => {
    const user = await ListingCategory.findOne(condition);
    return user;
  };

  static findAll = async (condition) => {
    const user = await ListingCategory.find(condition);
    return user;
  };

  searchCustomerByEmail = async (name) => {
    const users = await ListingCategory.find({
      name: { $regex: '.*' + name + '.*' },
    });
    return users;
  };

  static _delete = async(condition) => {
    await ListingCategory.deleteOne(condition)
    return;
  }
}

module.exports = {
  ListingCategoryRepo,
};
