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
            res.json({msg: 'unchanged'});
        }
        else{
            res.json({msg: 'changed'});
        }
    });
});

router.delete('/contacts', (req, res, next) => {
    Contact.remove({}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports = router; 