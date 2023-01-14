// const catchAsync = require('../utils/catchAsync');
const catchAsync = require('../utils/catchAsync');
const { CustomerService } = require('../services');
const {
  successResponse,
  abortIf,
  redirect,
  download,
  downloadPdfFile,
  downloadFile,
} = require('../utils/responder');
const { paginate, paginateOptions } = require('../utils/paginate');

const customerService = new CustomerService();

const getUserDetails = catchAsync(async (req, res, next) => {
  const result = await customerService.getUserDetails(req.params.user_id);
  return successResponse(req, res, result);
});

const updateUser = catchAsync(async (req, res, next) => {
  const result = await customerService.updateUser(req.params.user_id, req.body);
  return successResponse(req, res, result);
});

const listAllUsers = catchAsync(async (req, res, next) => {
  const result = await customerService.listAllUsers();
  return successResponse(req, res, result);
});

module.exports = {
  getUserDetails,
  updateUser,
  listAllUsers,
};
