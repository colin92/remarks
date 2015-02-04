var express = require('express');
var router = express.Router();
var marked = require('marked');
var model = require('../models/');

/* GET home page. */
router.get('/', function(req, res) {
  model.find({}, function(err, emails) {
    res.render('index', { title: JSON.stringify(emails) });
  });
});
// mail2webhook test
var querystring = require('querystring');
var MailParser = require('mailparser').MailParser;
router.post('/incoming-email', function(req, res) {
  console.log('incoming email');
//  var chunks = [];
//  var params = querystring.parse(req.body);
//  console.log(params);
//  req.on('data', chunks.push.bind(chunks));
//  req.on('end', function() {
//    console.log('request:', req);
    var mailparser = new MailParser();
    mailparser.on("end", function(mail_object) {
      // API for https://github.com/andris9/mailparser
      console.log(mail_object);
      mail_object.from; // [ { address: 'sender@example.com', name: 'Sender Name' } ]
      mail_object.to;   // [ { address: 'example@mail2webhook.com', name: '' } ]
      mail_object.subject; // "Testing 1 2 3"
      mail_object.html;
      mail_object.text;
      console.log('from: ', mail_object.from, 'to: ', mail_object.to, 'subject: ', mail_object.subject);
      console.log(mail_object);
      model.create({ message: mail_object.message });

      res.writeHead(200, {'content-type': 'text/plain'});
      res.end();
    });
    console.log('req.body.message: ', req.body.message);
     
    var params = JSON.parse(req.body);
    mailparser.write(params['message']);
    mailparser.end();
//  });
});

module.exports = router;
