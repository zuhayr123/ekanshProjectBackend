const express = require('express');
const router = express.Router();
const Contact = require('../modals/contacts');


                                                // contacts API 
// retreiving data
router.get('/contacts', (req,  res , next) =>{
    Contact.find(function(erer, contacts){
        res.json(contacts);
    })
});

//add contact
router.post('/contacts', (req, res, next) => {
    let newContact = new Contact({
        temperature: req.body.temperature,
        rpm: req.body.rpm,
        timestamp: req.body.timestamp
    });

    newContact.save((err, contact)=>{
        if(err){
            res.json({msg: 'failed to add contacts'});
        }
        else{
            res.json({msg: 'Contact added succesfully'});
        }
    });
});

module.exports = router; 