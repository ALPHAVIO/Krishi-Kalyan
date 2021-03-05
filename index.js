require('db/mongoose')
const express = require('express')
const app = express()
const kishanRouter = require('router/kishan')
const signupRouter = require('router/signup')
const loginRouter = require('router/login')
const updateRouter = require('router/update')
const productsRouter = require('router/products')
const logoutRouter = require('router/logout')
const homeRouter = require('router/home')
const customerRouter = require('router/customer')
const commentRouter = require('router/comments')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const ejs = require('ejs')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json()) /*This is used to automatically parse json data */
app.use(cookieParser())
app.use(homeRouter)
app.use(kishanRouter)
app.use(customerRouter)
app.use(signupRouter)
app.use(loginRouter)
app.use(logoutRouter)
app.use(updateRouter)
app.use(productsRouter)
app.use(commentRouter)
app.use(express.static(__dirname + '/public'));
app.get('*',(req,res)=>{
    res.send('404')
})
app.listen('3000', () => {
    console.log('Server running at port 3000')
})
