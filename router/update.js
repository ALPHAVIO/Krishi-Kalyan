const express = require('express')
const router = new express.Router()
const auth = require('middleware/authentication')
const User = require('model/farmer') /*Loading user model */
router.get('/update', async (req, res) => {
    res.render('update')
})
router.post('/update', auth, async (req, res) => {

    // console.log(req.user)
    const updates = Object.keys(req.body)
    // console.log(req.body)
    //console.log(updates)
    var allowedUpdate = []
    updates.forEach((update) => {

        if (req.body[update] != '') {
            allowedUpdate.push(update)
        }
    })

    //   console.log(allowedUpdate)
    try {


        allowedUpdate.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.render('kishan')
    } catch (e) {
        console.log(e)
        res.render('update')
    }
})

module.exports = router