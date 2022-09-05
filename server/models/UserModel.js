const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique:true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength:[8,'Password must be at least 8 characters']
    },

} , {timestamps: true});

UserSchema.plugin(uniqueValidator,{message:"{PATH} is already registered!"})
const User = mongoose.model('User', UserSchema);
module.exports = User;
