// models/user.js
const mongoose = require('mongoose');

// const Testimony = require('./Prayer');
// const Prayer = require('./Prayer');

const { Schema } = mongoose;

const AuthOtpSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
});

const AuthOtp = mongoose.model('AuthOtp', AuthOtpSchema);

// UserSchema.pre('remove', async (document) => {
//   const user_id = document._id;
//   await Prayer.deleteMany({ user: user_id });
//   await Testimony.deleteMany({ user: user_id });
// });

module.exports = AuthOtp;
