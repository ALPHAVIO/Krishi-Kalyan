const express = require('express')
const bodyParser = require('body-parser')
const auth = require('middleware/authentication')
const router = new express.Router()
const Helper = require('public/js/helper')
const helper = new Helper()

router.use(bodyParser.urlencoded({
	extended: true
}))
router.use(express.json())

const Product = require('model/product')

router.get('/marketplace', async (req, res) => {
    let data
    try {
        const products = await Product.find()
        data = products
    } catch (error) {
        data = error
    }
    res.render('marketplace', {data: data, helper: helper})
})

router.post('/marketplace',auth, async (req, res) => {
    const author = req.user
    const productData = {
        auth: {
            name: author.firstname + ' ' + author.lastname,
            email: author.username,
            contact: author.contact,
        },
        ...req.body
    }
    const product = new Product(productData)
    try {
        await product.save()
    } catch (error) {
        console.log(error)
    }
    res.redirect('/marketplace')
})

module.exports = router