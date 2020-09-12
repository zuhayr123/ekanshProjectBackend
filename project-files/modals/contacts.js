//contacts schema

const mongoose = require('mongoose');


const ContactsSchema = mongoose.Schema({
    temperature:{
        type : String,
        required : true
    },

    rpm:{
        type : String,
        required: true
    },

    timestamp:{
        type : String,
        required: true
    }
});

const Contact = module.exports = mongoose.model('Contact', ContactsSchema);