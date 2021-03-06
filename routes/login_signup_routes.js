const express = require('express');
const router = express.Router();
const UserDetails = require('../models/user-details');

router.post('/users', (req, res, next) => {
    let newUser = new UserDetails(req.body);

    UserDetails.findOne({ phone_number: newUser.phone_number }, function (erer, users) {
        if (users == null) {
            newUser.save((err, user_details) => {
                if (err) {
                    res.status(err.status || 500).json({ msg: 'Failed to add user' + err, status: 'error' });
                }
                else {
                    res.json({ msg: 'Successfully added new user', user: user_details, status: 'success' });
                }
            });
        }

        else {
            res.status(403).json({ msg: 'User Already Exists', users, status: 'signUpFailure' });
        }
    })
})

router.get('/login', (req, res, next) => {

    var phone_number_in_param = req.param('phone_number');
    var password_in_param = req.param('password');

    UserDetails.findOne({ phone_number: phone_number_in_param, password: password_in_param }, function (erer, user) {
        if (user == "" || user == null) {
            res.status(403).json({ msg: 'Check your ID and Password', user, status: 'loginFailure' });
        }
        else {
            res.json({ msg: 'Successfully logged in', user, status: 'success' });
        }

    })
});

router.get('/profile', (req, res, next) => {
    var phone_number = req.param('phone_number');

    UserDetails.findOne({ phone_number: phone_number }, function (erer, users) {
        if (erer || users == null) {
            res.status(403).json({ msg: 'The user does not exists', user: users, status: 'failure' });
        }
        else {
            res.json({ msg: 'Successfully fetched all users', user: users, status: 'success' });
        }
    })
})

router.get('/users', (req, res, next) => {
    var phone_number = req.param('phone_number');

    UserDetails.find({ phone_number: phone_number }, function (erer, users) {
        if (erer) {
            res.status(403).json({ msg: 'Error in fetching user data', user: users, status: 'failure' });
        }
        else {
            res.json({ msg: 'Successfully fetched all users', user: users, status: 'success' });
        }
    })
})

router.get('/all_users', (req, res, next) => {
    UserDetails.find(function (erer, users) {
        res.json({ msg: 'Successfully fecthed all users', user: users, status: 'success' });
    })
});

router.put('/sub', (req, res, next) =>{
    var phone_number_in_param = req.param('phone_number')

    UserDetails.updateOne({phone_number : phone_number_in_param}, {is_sub : true},function(erer, user){

        if(erer){
            res.status(403).json({msg: 'Error in updating data', user : req.body , status : 'failure'});
        }
        else{
            res.json({msg : 'User Successfuly Updated', user : req.body, status : 'success'});
        }
    })
});

module.exports = router; 