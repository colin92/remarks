var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_app33694223:267ol5qtlurk252t40rlnqr6va@ds041651.mongolab.com:41651/heroku_app33694223');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var emailSchema = mongoose.Schema({
  message: String;
});

var Email = mongoose.model('Email', emailSchema);

module.exports = Email;



