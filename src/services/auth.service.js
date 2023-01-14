const httpStatus = require('http-status');
const { userRepo, authOtpRepo } = require('../dbservices');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const { userDTO } = require('../DTOs/user.dto');
const { hash } = require('../utils/passwordHash');
const moment = require('moment');

const moments = require('moment-timezone');
const { generateRandom } = require('../utils/Helpers');
const {
  NotificationService,
} = require('./ThirdpartyServices/notification.service');
const dateNigeria = moments.tz(Date.now(), 'Africa/Lagos');

class AuthService {
  // providerSignUp = async (data) => {};

  customerLogin = async (data) => {
    // try {
    let { email, password } = data;
    email = email.trim().toLowerCase();
    password = password.trim();
    const user = await userRepo.findCustomer({ email });
    abortIf(!user, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    const password_check = await bcrypt.compare(password, user.password);
    abortIf(!password_check, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    delete user.password;
    const token = await generateToken(user);
    /**
     *  ==> Call Notification Service <==
     */
    return { message: 'success', user, ...token };
    // } catch (e) {
    //   console.error(e);
    // }
  };

  customerSignUp = async (data) => {
    // try {
    let {
      email,
      password,
      confirmPassword,
      firstname,
      lastname,
      phonenumber,
      bio,
      date_of_birth,
    } = data;
    abortIf(
      password !== confirmPassword,
      httpStatus.BAD_REQUEST,
      'Passwords do not match'
    );
    password = password.trim();
    const hashed_password = await hash(password);

    const user = await userRepo.findCustomer({ email, phonenumber });
    console.log(user);
    abortIf(
      user,
      httpStatus.BAD_REQUEST,
      'Email or Phonenumber already exists'
    );
    //create provider
    const _data = {
      email: email.toLowerCase().trim(),
      password: hashed_password,
      firstname,
      lastname,
      phonenumber,
      date_of_birth: new Date(moment(date_of_birth).format('YYYY-MM-DD')),
    };
    const create_customer = await userRepo.customerCreate(_data);
    console.log(create_customer);
    /**
     * => generate TOKEN
     *  ==> Call the Notification Service <==
     */
    const otp = generateRandom(6, 'numeric');
    await NotificationService.sendSMS({
      message: `Your One Time Password(OTP) is ${otp}. This will expire after 5 minutes`,
      phonenumber,
    });
    // ==> create on DB
    authOtpRepo.create({
      user_id: create_customer._id,
      otp,
      created_at: new Date(),
    });
    // ==> send to notification service

    const token = await generateToken(create_customer);
    delete create_customer.password;
    //send Email here
    return {
      message: 'Please check your email to activate your account',
      user: create_customer,
      ...token,
    };
    // } catch (er) {
    //   console.error(er);
    // }
  };

  resendOtp = async () => {};

  verifyOtp = async (data) => {
    const { user_id, otp } = data;
    const findOtp = await authOtpRepo.findOtp({ user_id, otp });
    abortIf(!findOtp, httpStatus.BAD_REQUEST, 'Otp is invalid');
    const updateUser = await userRepo.update(user_id, { activated: true });
    abortIf(!updateUser, httpStatus.BAD_REQUEST, 'Could not activate user');
    return updateUser;
  };
}

module.exports = {
  AuthService,
};
