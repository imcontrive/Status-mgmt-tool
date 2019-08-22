var express = require('express');
var router = express.Router();
var Company = require('../../models/Company');


router.get('/', function(req, res, next) {
  Company.find({}).select('-password')
  .exec((err, company) => {
    console.log("this is company list",company);
    if(err) res.status(500).json({ success: false, err:"not found" });
    res.status(200).json({ success: true, company: company });
  })
});



module.exports = router;