// const catchAsync = require('../utils/catchAsync');
const catchAsync = require('../utils/catchAsync');
const customerService = require('../services/customer.service');
const {
  successResponse,
  abortIf,
  redirect,
  download,
  downloadPdfFile,
  downloadFile,
} = require('../utils/responder');
const { paginateOptions } = require('../utils/paginate');

const listingsController = catchAsync(async (req, res, next) => {
  const paginate = paginateOptions(req)
  const result = await customerService.listings(req.query.search, paginate);
  return successResponse(req, res, result);
});

module.exports = {
  listingsController
};
