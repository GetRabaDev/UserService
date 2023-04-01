// const catchAsync = require('../utils/catchAsync');
const catchAsync = require('../utils/catchAsync');
const { createListing, deleteListing } = require('../services/admin.service');
const {
  successResponse,
  abortIf,
  redirect,
  download,
  downloadPdfFile,
  downloadFile,
} = require('../utils/responder');
const { paginate, paginateOptions } = require('../utils/paginate');

const createListingCategory = catchAsync(async (req, res, next) => {
  const customerLogin = await createListing(req.body);
  return successResponse(req, res, customerLogin);
});

const deleteListingCategory = catchAsync(async (req, res, next) => {
  const customerLogin = await deleteListing(req.body);
  return successResponse(req, res, customerLogin);
});


module.exports = {
  createListingCategory,
  deleteListingCategory
};
