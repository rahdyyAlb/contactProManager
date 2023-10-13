const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, default: false},
});
module.exports = mongoose.model('user', userSchema);