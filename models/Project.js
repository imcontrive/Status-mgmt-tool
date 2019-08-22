var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  description:{
    type: String,
    default:"Please explain the Project description"
  },
  company: { type: Schema.Types.ObjectId, ref: 'Company'},
	assignedUser: [{ type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

var Project = mongoose.model("Project", projectSchema);

module.exports = Project;