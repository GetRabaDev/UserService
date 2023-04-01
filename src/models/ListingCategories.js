// models/user.js
const mongoose = require('mongoose');

// const Testimony = require('./Prayer');
// const Prayer = require('./Prayer');

const { Schema } = mongoose;

const ListingCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
});

const ListingCategory = mongoose.model('ListingCategory', ListingCategorySchema);

// UserSchema.pre('remove', async (document) => {
//   const user_id = document._id;
//   await Prayer.deleteMany({ user: user_id });
//   await Testimony.deleteMany({ user: user_id });
// });

module.exports = ListingCategory;
