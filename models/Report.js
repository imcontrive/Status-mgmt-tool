var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = new Schema({
  date : {
    type: String,
    required: true
  },
  user: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  breakdown: [{
    type:{
      type: String,
      enum: ["WAW","WAH","Sick","Leave"]
    },
    project: {
     type: String
    },
    session: {
     type: String
    },
    comments: {
     type: String
    }
  }]
}, {timestamps: true});

var Report = mongoose.model("Report", reportSchema);

module.exports = Report;