const express = require('express')
const bodyParser = require('body-parser')
const auth = require('middleware/authentication')
const router = new express.Router()
router.use(bodyParser.urlencoded({
	extended: true
}))
router.use(express.json())

const Comment = require('model/comment')
const Product = require('model/product')

router.get('/comments/:id', async (req, res) => {
    const productId = req.params.id
    let data
    try {
        const product = await Product.findOne({_id: productId})
        const comments = await Comment.find({productId: productId})
        product.comments = comments
        data = product
    } catch (error) {
        data = error
    }
    res.render('comments', {data: data})
})

router.post('/comments/:id',auth, async (req, res) => {
    const productId = req.params.id
    const author = req.user 
    const commentData = {
        productId: productId,
        auth: {
            _id: author._id,
            name: author.firstname + ' ' + author.lastname,
            contact: author.contact,
            userType: author.userType,
            email: author.username
        },     
        ...req.body
    }
    const comment = new Comment(commentData)
    try {
        await comment.save()
    } catch (error) {
        console.log(error)
    }
    res.redirect(req._parsedUrl.pathname)
})

module.exports = router