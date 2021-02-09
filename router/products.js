const express = require('express')
const bodyParser = require('body-parser')
const router = new express.Router()
router.use(bodyParser.urlencoded({
	extended: true
}))
router.use(express.json())

const Product = require('model/product')

router.get('/products', async (req, res) => {
    let data
    try {
        const products = await Product.find()
        data = products
    } catch (error) {
        data = error
    }
    res.render('products', {data: data})
})

router.post('/products', async (req, res) => {
    const product = new Product(req.body)
    try {
        await product.save()
    } catch (error) {
        console.log(error)
    }
    res.redirect('/products')
})

module.exports = router