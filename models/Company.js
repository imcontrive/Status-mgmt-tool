var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name : {
    type: String,
    default: "Unknown"
  },
  emailFormat: {
    type: String,
  }
}, {timestamps: true});

var Company = mongoose.model("Company", companySchema);

module.exports = Company;