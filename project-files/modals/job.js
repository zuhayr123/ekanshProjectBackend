const mongoose = require('mongoose');


const JobRequirementSchema = mongoose.Schema({
    enqFor:{
        type : String,
        required : true
    },

    yourName:{
        type : String,
        required : false
    },

    country:{
        type : String,
        required : false
    },

    city:{
        type : String,
        required: false
    },

    mail:{
        type : String,
        required: false
    },

    ph_number:{
        type : String,
        required: false
    },

    requirement:{
        type : String,
        required: false
    }
});

const JobRequirement = module.exports = mongoose.model('JobRequirement', JobRequirementSchema);