const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
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
    middlename: {
        type: String,
        trim: true

    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
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

UserSchema.pre('save', async function (next) {
    const farmer = this
    // console.log(farmer)
    if (farmer.isModified('password')) {
        farmer.password = await bcrypt.hash(farmer.password, 8)
    }


    next()
})


const User = mongoose.model('User', UserSchema)
module.exports = User
