var express = require('express');
var router = express.Router();

var userRouter = require('./users');



router.use('/users', userRouter);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({success: true, message: 'Welcome to Node APIs'});
});

module.exports = router;
