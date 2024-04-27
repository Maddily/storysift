// src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
    select: false // Do not include password in query results by default
  },
  joiningDate: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  timestamps: true
});

// Hash the password before saving to database
userSchema.pre('save', async function (next) {
  const user = this;

  // NB! Only hash the password if it's modified or new
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare password for authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
