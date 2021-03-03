const express = require('express')
const router = new express.Router()
const auth = require('middleware/authentication')
const User = require('model/farmer') /*Loading user model */


router.get('/', async (req, res) => {
    res.render('home', {data: null})
})

router.get('/home', auth, async (req, res) => {
    const user = req.user
    const data = {
        message: '',
        user: {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.username,
            userType: user.userType,
            address: user.location,

        }
    }
    res.render('home', {data: data})
})

module.exports = router