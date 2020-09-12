//contacts schema

const mongoose = require('mongoose');


const ContactsSchema = mongoose.Schema({
    switchState:{
        type : String,
        required : true
    },

    timeStamp:{
        type : String,
        required: true
    }
});

const Contact = module.exports = mongoose.model('Contact', ContactsSchema);