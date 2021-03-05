const express = require('express')
const router = new express.Router()
const auth = require('middleware/authentication')
router.get('/update', async (req, res) => {
    res.render('update')
})
router.post('/update', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    var allowedUpdate = []
    updates.forEach((update) => {

        if (req.body[update] != '') {
            allowedUpdate.push(update)
        }
    })
    try {
        allowedUpdate.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.redirect('/home')
    } catch (e) {
        console.log(e)
        res.render('update')
    }
})

module.exports = router