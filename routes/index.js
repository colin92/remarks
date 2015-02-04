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
var model = require('./models/');
router.post('/incoming-email', function(req, res) {
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

module.exports = router;
