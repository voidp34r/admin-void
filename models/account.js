var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  fullname: String,
  username: String,
  email: String,
  birthdate: Date
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);