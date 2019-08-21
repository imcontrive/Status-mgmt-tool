var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

var userSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		min: 6,
		max: 20,
		required: true,
  },
	isAdmin: {
		type: Boolean,
		default: false,
	},
	company: [{ type: Schema.Types.ObjectId, ref: 'Company'}]
}, {timestamps: true});

userSchema.pre('save', function (next) {
  if(this.password && this.isModified('password')) {
		this.password = bcrypt.hashSync(this.password, salt);
  }
  if(this.email === process.env.EMAIL){
		this.isAdmin = true;
	} 
  next();
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync( password, this.password );
};

var User = mongoose.model("User", userSchema);

module.exports = User;