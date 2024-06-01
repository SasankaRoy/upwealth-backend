const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name:{
        type : String,
        required:true,
    },
    last_name:{
        type : String,
        required:true,
    },
    email:{
        type : String,
        required:true,
        unique:true,
    },
    phone_number:{
      type:Number,
      required:true,
      unique:true,
    },
    password:{
        type : String,
        required:true,
    },


});

// create model 

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;

