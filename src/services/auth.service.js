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
    const promises = [];
    promises.push(
      await NotificationService.sendEmail({
        email: email.toLowerCase().trim(),
        subject: 'Account Login',
        firstname,
        message: `You logged in at ${moment(new Date()).format('DD-MM-YYYY')}.`,
        showButton: false,
      })
    );
    // ==> create on DB
    await Promise.all(promises);
    return { message: 'success', user, ...token };
    // } catch (e) {
    //   console.error(e);
    // }
  };

  registerPhonenumber = async (phone) => {
    //check if phonenumber exists
    const promises = [];
    const user =  await userRepo.findCustomer({phonenumber: phone})
    abortIf(user, httpStatus.BAD_REQUEST, 'Phonenumber already exists.')
    //store customer on DB
    // const createUser = await userRepo.customerCreate({phonenumber: phone})
    //send otp to phone number using termii
    const otp = '123456' //generateRandom(6, 'numeric');
    await authOtpRepo.create({
      phonenumber: phone,
      otp,
      created_at: new Date(),
    })
    promises.push(
      await NotificationService.sendSMS({
        message: `Your One Time Password(OTP) is ${otp}. This will expire after 5 minutes`,
        phonenumber: String(phone),
      })
    );
    await Promise.all(promises);
    return {message: 'Otp sent to your phone.'}
  }

  verifyPhonenumber = async({phone, otp}) => {
    //check if otp and phone match
    const otpCheck = await authOtpRepo.findOtp({phonenumber: phone, otp})
    abortIf(!otpCheck, httpStatus.BAD_REQUEST, 'Invalid OTP')
    const findUser = await userRepo.findCustomer({phonenumber: phone})
    abortIf(findUser, httpStatus.BAD_REQUEST, 'Phone number already in use.')
    const createUser = await userRepo.customerCreate({verified: true, phonenumber: phone})
    return createUser
  }

  customerSignUp = async (data) => {
    // try {

    let {
      email,
      password,
      confirmPassword,
      firstname,
      lastname,
      phonenumber
    } = data;
    abortIf(
      password !== confirmPassword,
      httpStatus.BAD_REQUEST,
      'Passwords do not match'
    );
    //for testing sakes
    password = password.trim();
    const hashed_password = await hash(password);

    const user = await userRepo.findCustomer({ phonenumber, verified: true });
    console.log(user);
    abortIf(
      !user,
      httpStatus.BAD_REQUEST,
      'Please verify this phonenumber'
    );
    //create provider
    const _data = {
      email: email.toLowerCase().trim(),
      password: hashed_password,
      firstname,
      lastname,
      phonenumber,
    };
    const create_customer = await userRepo.update(user._id, _data);
    console.log(create_customer);
    /**
     * => generate TOKEN
     *  ==> Call the Notification Service <==
     */
    const promises = [];
    promises.push(
      await NotificationService.sendEmail({
        email: email.toLowerCase().trim(),
        subject: 'Account Created',
        firstname,
        message: `Your account has been created, kindly activate your account with the link below`,
        showButton: true,
      })
    );
    // ==> create on DB
    await Promise.all(promises);
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
//
module.exports = {
  AuthService,
};
