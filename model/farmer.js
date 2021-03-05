const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalide')
            }
        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('password contain password')
            }
        }

    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: Number,
        required: true,
        trim: true
    },
    userType: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    Tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }

}, {
    timestamps: true
})

UserSchema.statics.findByCredential = async (login) => {
    const username = login.username
    const password = login.password
    const farmer = await User.findOne({
        username
    })
    if (!farmer) {
        throw new Error('No kishan with this name')
    } else {
        const isMatch = await bcrypt.compare(password, farmer.password)
        if (!isMatch) {
            throw new Error('Password is incorrect')
        }
        return farmer
    }

}

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.SECRET_KEY)
    user.Tokens = user.Tokens.concat({
        token
    })
    await user.save()
    return token
}

UserSchema.pre('save', async function (next) {
    const farmer = this
    if (farmer.isModified('password')) {
        farmer.password = await bcrypt.hash(farmer.password, 8)
    }
    next()
})


const User = mongoose.model('User', UserSchema)
module.exports = User
