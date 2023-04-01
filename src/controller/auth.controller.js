// const catchAsync = require('../utils/catchAsync');
const catchAsync = require('../utils/catchAsync');
const { AuthService } = require('../services');
const {
  successResponse,
  abortIf,
  redirect,
  download,
  downloadPdfFile,
  downloadFile,
} = require('../utils/responder');
const { paginate, paginateOptions } = require('../utils/paginate');

const authService = new AuthService();

const customerLogin = catchAsync(async (req, res, next) => {
  const customerLogin = await authService.customerLogin(req.body);
  return successResponse(req, res, customerLogin);
});

const customerSignUp = catchAsync(async (req, res, next) => {
  const customer = await authService.customerSignUp(req.body);
  return successResponse(req, res, customer);
});

const verifyOtp = catchAsync(async (req, res, next) => {
  const customer = await authService.verifyOtp(req.body);
  return successResponse(req, res, customer);
});

const registerPhone = catchAsync(async (req, res, next) => {
  const customer = await authService.registerPhonenumber(req.body.phone);
  return successResponse(req, res, customer);
});

const verifyPhone = catchAsync(async (req, res, next) => {
  const customer = await authService.verifyPhonenumber(req.body);
  return successResponse(req, res, customer);
});

module.exports = {
  customerLogin,
  customerSignUp,
  verifyOtp,
  registerPhone,
  verifyPhone
};
