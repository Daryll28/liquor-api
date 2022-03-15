const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String,required: true},
    contact: {type: String,required: true,unique:true},
    email:{type: String,required: true,unique:true},
    password:{type: String,required: true},
    LoginDate:{type: Date, required: true, default: Date.now},
    isAdmin:{type:Boolean,default: false,},  
},
{ timestamp: true });

module.exports = mongoose.model('User', UserSchema);