const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    UserName: {
        type:String,
        required:true
    },
    UserFullname: {
        type:String,
        required:true
    },
    UserEmail: {
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:null
    },
    UserPassword: {
        type:String,
        required:true
    },
    UserDeleted: {
        type:Boolean,
        default:false
    },
    fcmToken: {
        type:String,
        default:null
    },
    
    deviceType : {type:String ,default:null},
    token : {type:String, default:null}

    
  });

  module.exports = mongoose.model('user', userSchema);
