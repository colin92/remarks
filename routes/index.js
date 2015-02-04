var express = require('express');
var router = express.Router();
var marked = require('marked');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: marked('# Header \n *** \n`this is code`') });
});

module.exports = router;
