const mongoose = require('mongoose')
const {stringify} = require('nodemon/lib/utils')

const UserSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email:{type: String,required: true,unique:true},
    password:{type: String,required: true},
    contact:{type: String,required:true,unique:true},
    LoginDate:{type: Date, required: true, default: Date.now},
    isAdmin:{type:Boolean,default: false,},
    joinDate: {type: Date, required: true, default: Date.now}  
},
{ timestamp: true });




module.exports = mongoose.model('User', UserSchema);