const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    auth: {
        // _id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User"
        // }
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment
