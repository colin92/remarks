var express = require('express');
var router = express.Router();
var marked = require('marked');
var model = require('../models/');
var querystring = require('querystring');
var MailParser = require('mailparser').MailParser;

/* GET home page. */
router.get('/', function(req, res) {
  model.find({}, function(err, emails) {
    var markedEmails = emails.map(function(email) { return marked(email.message); });
    res.render('index', { messages: markedEmails });
  });
});

router.get('/entries', function(req, res) {
  model.find({}, function(err, entries) {
//    var markedEntries = entries.map(function(entry) { 
//      entry.messageHtml = marked(entry.message); 
//      return entry;
//    });
    res.send( entries );
  });
});

router.get('/entry/:id/edit', function(req, res) {
  var entry_id = req.params.id;
  console.log(entry_id);
  model.findOne({ _id: entry_id }, function(err, entry) {
    console.log(entry);
    res.json( entry );
  });
});

router.post('/entry/:id/edit', function(req, res) {
  var entry_id = req.params.id;
  var new_entry = req.body;
  model.findOneAndUpdate({ _id: entry_id }, new_entry, function(err, entry) {
    res.json( entry );
  });
});

// mail2webhook 

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
      // mail_object.from; [ { address: 'sender@example.com', name: 'Sender Name' } ]
      // mail_object.to;   [ { address: 'example@mail2webhook.com', name: '' } ]
      // mail_object.subject; "Testing 1 2 3"
      // mail_object.html;
      // mail_object.text;
      console.log('Test: from: ', mail_object.from, 
                  'to: ', mail_object.to, 
                  'subject: ', mail_object.subject,
                  'message text: ', mail_object.text
                  );
      if (mail_object.from[0].address === 'colinmeret@gmail.com') {
        console.log('correct sender...saving email');
        model.create({ date: Date.now(), 
                       title: mail_object.subject, 
                       message: mail_object.text });
        console.log('email saved');
      }
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end();
    });
     
    mailparser.write(req.body.message);
    mailparser.end();
//  });
});

module.exports = router;
