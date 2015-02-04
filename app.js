var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var marked = require('marked');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// mailin test stuff
var emails = [];
//var mailin = require('mailin');
//
//mailin.start({
//  port: 25,
//  disableWebhook: true
//});

// mail2webhook test
var querystring = require('querystring');
var MailParser = require('mailparser').MailParser;
var model = require('./models/');
app.addListener('request', function(req, res) {
  var chunks = [];
  req.on('data', chunks.push.bind(chunks));
  req.on('end', function() {
    var mailparser = new MailParser();
    mailparser.on("end", function(mail_object) {

      // API for https://github.com/andris9/mailparser
      mail_object.from; // [ { address: 'sender@example.com', name: 'Sender Name' } ]
      mail_object.to;   // [ { address: 'example@mail2webhook.com', name: '' } ]
      mail_object.subject; // "Testing 1 2 3"
      mail_object.html;
      mail_object.text;
      console.log(mail_object.from, mail_object.to, mail_object.subject);
      console.log(mail_object);
      model.create({ message: mail_object.message });

      res.writeHead(200, {'content-type': 'text/plain'});
      res.end();
    });
    var params = querystring.parse(chunks.join("").toString());
    mailparser.write(params['message']);
    mailparser.end();
  });
});

//app.addListener('request', function(req, res) {
//  var chunk = [];
//  req.on('data', chunks.push.bind(chunks));
//  req.on('end', function() {
//    var mailparser = new MailParser();
//    mailparser.on('end', function(mail_object) {
//      res.writeHead(200, { 'content-type': 'text/plain'});
//      res.end();
//    });
//    var params = querystring.parse(chunks.join('').toString());
//    mailparser.write(params[message]);
//    mailparser.end();
//  });
//
//});

//mailin.on('authorizeUser', funciton( connection, username, password, done) {
//  if (username == "colin" && password == "mysecret") {
//    done(null, true);
//  }
//  else {
//    done(new Error("Unauthorized!"), false);
//  }
//});


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    swig.setDefaults({ cache: false });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
