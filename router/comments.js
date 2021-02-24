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
    let data
    try {
        const comments = await Comment.find()
        data = comments
    } catch (error) {
        data = error
    }
    res.render('comments', {data: data})
})

router.post('/comments/:id',auth, async (req, res) => {
    const comment = new Comment(req.body)
    // console.log(res)
    try {
        await comment.save()
        const product = new Product()
        // product.update()
        //     .then((res) => callback(null, res))
        //     .catch((err) => new Error(JSON.stringify(err)));
    } catch (error) {
        console.log(error)
    }
    res.redirect('/comments')
})

module.exports = router