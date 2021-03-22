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
            res.status(403).json({msg: 'User Already Exists',users, status : 'signUpFailure'});
        }
    })
})

module.exports = router; 