var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name : {
    type: String,
    default: "Unknown"
  },
  admin: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  emailFormat: {
    type: String,
  }
}, {timestamps: true});

var Company = mongoose.model("Company", companySchema);

module.exports = Company;