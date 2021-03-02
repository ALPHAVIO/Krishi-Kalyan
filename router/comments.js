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
        data = product
    } catch (error) {
        data = error
    }
    res.render('comments', {data: data})
})

router.post('/comments/:id',auth, async (req, res) => {
    if (req.user) {
        const productId = req.params.id
        const comment = new Comment(req.body)
        comment.author = req.user
        try {
            await comment.save()
            const product = await Product.findOne({_id: productId})
            product.comments.push(comment)
            await product.save()
        } catch (error) {
            console.log(error)
        }
        res.redirect(req._parsedUrl.pathname)
    } else {
        res.redirect('register')
    }
})

module.exports = router