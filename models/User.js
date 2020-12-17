const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true,
    unique: true,
  }
  // password: {
  //     type: String,
  //     minlength: 5
  // },
});

// module.exports = mongoose.model('User', userSchema)
const User = mongoose.model('User', userSchema)
module.exports = { User }