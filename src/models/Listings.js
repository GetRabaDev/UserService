// models/user.js
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2')

const {listingCategory} = require('../utils/Helpers') 

const categoryEnum = listingCategory()

const { Schema } = mongoose;

const ListingSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  public: {
    type: String,
    enum: [true, false],
  },
  category: {
    type: String,
  },
  created_at: {
    type: Date,
  },
});

const Listing = mongoose.model('Listing', ListingSchema);

ListingSchema.plugin(paginate);

module.exports = Listing;
