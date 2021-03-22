//contacts schema

const mongoose = require('mongoose');


const UserDetailsSchema = mongoose.Schema({
    user_id:{
        type : String,
        required : false
    },

    password:{
        type : String,
        required : true
    },

    first_name:{
        type : String,
        required: true
    },

    last_name:{
        type : String,
        required: true
    },

    phone_number:{
        type : String,
        required: true
    },

    user_photo:{
        type : String,
        required: false
    }
});

const UserDetails = module.exports = mongoose.model('UserDetails', UserDetailsSchema);