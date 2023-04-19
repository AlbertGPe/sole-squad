const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: {
    type: String, 
    required: "Sneaker name is required"
  },
  price: {
    type: Number
  }, 
  brand: {
    type: String,
    required: "Brand name is required"
  },
  description: {
    type: String
  },
  details: {
    type: [String]
  },
  gender: {
    type: String,
    required: "Gender is required"
  },
  new: {
    type: Boolean
  },
  release_date: {
    type: String
  },
  images: {
    type: [String]
  }, 
  colors_images: {
    type: [String]
  },
  box_condition: {
    type: String
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  }
})

const Sneaker = mongoose.model('Sneaker', sneakerSchema);
module.exports = Sneaker;