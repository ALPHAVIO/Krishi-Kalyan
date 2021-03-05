const jwt = require('jsonwebtoken')
const User = require('model/farmer')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const decode_token = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findOne({
            _id: decode_token._id,
            'Tokens.token': token
        })
        if (!user)
            throw new Error('No user found')
        else {
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