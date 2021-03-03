const jwt = require('jsonwebtoken')
const User = require('model/farmer')

const auth = async (req, res, next) => {
    // console.log("Authentication is going on")
    try {
        //console.log(req.cookies)
        const token = req.cookies.jwt
        //console.log(token)
        const decode_token = jwt.verify(token, 'thisismyapp')
        // const decode_token = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(decode_token)

        const user = await User.findOne({
            _id: decode_token._id,
            'Tokens.token': token
        })
        if (!user)
            throw new Error('No user found')
        else {

            //console.log(user)
            req.token = token
            req.user = user
            next()
        }
    } catch (e) {
        console.log(e)
        message = 'Please do authentication'
        res.render('login', {
            message: message
        })
    }
}

module.exports = auth