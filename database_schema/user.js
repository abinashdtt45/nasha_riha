const mongoose = require('mongoose')
const validator = require('validator')


var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message:'{VALUE} is not a valid email'
        }

    },
    name: {
        type: String,
        minlength: 1
    },
    password: {
        type: String,
        require: true,
        minlength: 5
    },
    phonenumber: {
        type: String,
        minlength: 10
    },
    id: {
        type: String,
        require: true
    }
})

var User = mongoose.model('User',UserSchema)
module.exports = {User}