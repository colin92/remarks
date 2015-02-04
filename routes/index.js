var express = require('express');
var router = express.Router();
var marked = require('marked');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: marked('# Header \n *** \n`this is code`') });
});

router.post('/', function(req, res) {
//  res.render('index', { title: marked('`') });
  res.json(req);
});
module.exports = router;
