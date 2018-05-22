var mongoose = require('mongoose');
var Test = require('../models/test');
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        
    },
    
    mobile: {
        type: Number,

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    TestsTaken: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
    }],


    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

module.exports = mongoose.model('User', userSchema);