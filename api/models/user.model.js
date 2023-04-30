const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema ({
  username: {
    type: String,
    required: "User name is required",
    minlength: [3, "Name needs at least 3 chars"],
    unique: true
  },
  email: {
    type: String,
    required: "User email is required",
    match: [/^\S+@\S+\.\S+$/, "Student email must be valid"],
    //unique: true
  },
  confirm: {
    type: Boolean,
    default: process.env.USER_CONFIRMATION_REQUIRED === 'false' //MUST BE FALSE!
  },
  password: {
    type: String,
    required: "User password is required",
    minlength: [8, "User password needs at least 8 chars"]
  },
  description: {
    type: String
  },
  instagramUrl: {
    type: String, 
    match: [
      /^https?:\/\/instagram\.com\/[a-z0-9]+$/,
      "Instagram URL must be valid",
    ]
  },
  image: {
    type: String,
    default: 'https://img.freepik.com/premium-vector/shoes-sneaker-footwear-vector-image-illustration_776624-111.jpg?w=2000'
  },
  community: {
    type: Boolean
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (dec, ret) {
      delete ret.__v;
      ret.id = ret._id
      delete ret._id
      delete ret.password
      return ret;
    }
  }
})

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt
      .genSalt(10)
      .then ((salt) => {
        return bcrypt.hash(this.password, salt).then((hash) => {
          this.password = hash;
          next();
        });
      })
      .catch((error) => next(error))
  } else {
    next();
  }
})

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

userSchema.virtual('sneakers', {
  ref: 'Sneaker',
  localField: '_id',
  foreignField: 'user',
  justOne: false
})

const User = mongoose.model('User', userSchema);
module.exports = User;