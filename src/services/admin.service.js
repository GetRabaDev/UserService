const httpStatus = require('http-status');
const { ListingCategoryRepo } = require('../dbservices');
const { abortIf } = require('../utils/responder');

class AdminService {
  static createListing = async(data) =>{
    const findCategory = await ListingCategoryRepo.find({name: data.name})
    abortIf(findCategory, httpStatus.BAD_REQUEST, 'Category already exists');
    const create = await ListingCategoryRepo.create(data)
    return create
  }

  static deleteListing = async(name) => {
    return ListingCategoryRepo._delete({name})
  }
}
//
module.exports = AdminService
