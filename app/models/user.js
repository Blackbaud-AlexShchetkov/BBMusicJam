// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// User Schema for storing users
var UserSchema = new Schema({
    username: { type: String, lowercase: true, trim: true, required: true, index: { unique: true } },
    name: { type: String, required: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0, required: true }
});

// Password requirements
function passwordIsValid(password) {
	if (!password || typeof password !== 'string') {
		return false;
	}

	return password.length > 7;
}

// Hash password before save
UserSchema.pre('save', function (next) {
	var user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) {
		return next();
	}

	// TODO stricter password requirements
	if (!passwordIsValid(user.password)) {
		next(new Error("Password must be at least 8 characters long"));
	}

	// hash the password with auto-generated salt
    bcrypt.hash(user.password, null, null, function(err, res) {
        if (err) {
        	return next(err);
        }

        // override the cleartext password with the hashed one
        user.password = res;
        next();
	});
});

// To compare passwords
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
        	return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('user', UserSchema);
