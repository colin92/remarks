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

module.exports = router;
