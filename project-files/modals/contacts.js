//contacts schema

const mongoose = require('mongoose');


const ContactsSchema = mongoose.Schema({
    redSwitch:{
        type : String,
        required : true
    },

    blueSwitch:{
        type : String,
        required : true
    },

    greenSwitch:{
        type : String,
        required : true
    },

    timeStamp:{
        type : String,
        required: true
    }
});

const Contact = module.exports = mongoose.model('Contact', ContactsSchema);