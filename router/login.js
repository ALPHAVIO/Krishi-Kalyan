const express = require('express')
const bodyParser = require('body-parser')
const router = new express.Router()
router.use(bodyParser.urlencoded({
    extended: true
})) /*This is used to parse body of request */
router.use(express.json()) /*This is used to automatically parse json data */

const User = require('model/farmer') /*Loading user model */

router.get('/login', async (req, res) => {
    var message = ''
    res.render('login', {
        message
    })
})
router.post('/login', async (req, res) => {
    //console.log(req.body)
    const email = req.body.username
    try {
        const user = await User.findByCredential(req.body)
        console.log(user)
        res.render('kishan')
    } catch (e) {
        console.log(e)
        message = 'Either Username Or password is wrong'
        res.render('login', {
            message: message
        })
    }
})

module.exports = router