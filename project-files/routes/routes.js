const express = require('express');
const router = express.Router();
const Contact = require('../modals/contacts');


                                                // contacts API 
// retreiving data
router.get('/contacts', (req,  res , next) =>{
    Contact.findOne(function(erer, contacts){
        res.json(contacts);
    })
});

//add contact
router.post('/contacts', (req, res, next) => {
    let newContact = new Contact({
        redSwitch: req.body.redSwitch,
        blueSwitch: req.body.blueSwitch,
        greenSwitch: req.body.greenSwitch,
        timeStamp: req.body.timeStamp
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

router.put('/contacts', (req, res, next) => {
    var timeStamp = req.param('timeStamp');
    Contact.updateOne({timeStamp : timeStamp}, req.body,function(erer, orders){

        if(erer){
            res.status(403).json({msg: 'Error in updating data', orders : req.body , status : 'failure'});
        }
        else{
            res.json({msg : 'Order Successfully Updated', orders : req.body, status : 'success'});
        }
    })
})

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