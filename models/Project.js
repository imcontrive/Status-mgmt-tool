var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  company: [{ type: Schema.Types.ObjectId, ref: 'Company'}],
	assignedUser: [{ type: Schema.Types.ObjectId, ref: 'User'}]
  

}, {timestamps: true});

var Project = mongoose.model("Project", projectSchema);

module.exports = Project;