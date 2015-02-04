var express = require('express');
var router = express.Router();
var marked = require('marked');
var model = require('../models/');

/* GET home page. */
router.get('/', function(req, res) {
  model.find({}, ['message'], function(err, emails) {
    console.log(emails);
    var markedEmails = emails.map(function(email) { return marked(email.message); });
    res.render('index', { messages: markedEmails });
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
      mail_object.from; // [ { address: 'sender@example.com', name: 'Sender Name' } ]
      mail_object.to;   // [ { address: 'example@mail2webhook.com', name: '' } ]
      mail_object.subject; // "Testing 1 2 3"
      mail_object.html;
      mail_object.text;
      console.log('Test: from: ', mail_object.from, 
                  'to: ', mail_object.to, 
                  'subject: ', mail_object.subject,
                  'message text: ', mail_object.text
                  );
      model.create({ message: mail_object.text });

      res.writeHead(200, {'content-type': 'text/plain'});
      res.end();
    });
     
    mailparser.write(req.body.message);
    mailparser.end();
//  });
});

module.exports = router;
