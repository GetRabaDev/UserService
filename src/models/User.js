// models/user.js
const mongoose = require('mongoose');

// const Testimony = require('./Prayer');
// const Prayer = require('./Prayer');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
  },
  activated: { type: Boolean, default: false },
  phonenumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  activate_token: { type: String },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

// UserSchema.pre('remove', async (document) => {
//   const user_id = document._id;
//   await Prayer.deleteMany({ user: user_id });
//   await Testimony.deleteMany({ user: user_id });
// });

module.exports = User;
