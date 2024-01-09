const mongoose = require('mongoose');
const validater = require('validator');

const userSchema = new mongoose.Schema({
    UserName: {
        type:String,
        required:true
    },
    UserPhonenumber: {
        type:Number,
        required:true
    },
    UserEmail: {
        type:String,
        required:true
        // unique: true,
        //  validate: {
        //     validator: function (value) {

        //         return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
        //     },
        //     message: 'Invalid email format'
        // }
    },
    
    UserPassword: {
        type:String,
        required:true
    },

    fcmToken: {
        type:String,
        default:null
    },
    
    deviceType : {type:String ,default:null},
    token : {type:String, default:''}

    
  });

  module.exports = mongoose.model('user', userSchema);
