const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default || require('passport-local-mongoose');


const signupSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  phonenumber: {
    type: String,
    required: true
  }
  // password: {
  //   type: String,
  //   required: true
  // }
  // confirmpassword: {
  //   type: String,
  //   required: true
  // }
});
signupSchema.plugin(passportLocalMongoose,{
  usernameField: 'email'
});
 

module.exports = mongoose.model('Signup', signupSchema);