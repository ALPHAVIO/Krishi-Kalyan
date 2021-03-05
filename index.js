require('db/mongoose')
const express = require('express')
const app = express()
const signupRouter = require('router/signup')
const loginRouter = require('router/login')
const updateRouter = require('router/update')
const marketplaceRouter = require('router/marketplace')
const logoutRouter = require('router/logout')
const homeRouter = require('router/home')
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
app.use(signupRouter)
app.use(loginRouter)
app.use(logoutRouter)
app.use(updateRouter)
app.use(marketplaceRouter)
app.use(commentRouter)
app.use(express.static(__dirname + '/public'));
<<<<<<< HEAD
app.get('*',(req,res)=>{
    res.send('404')
})
app.listen('3000', () => {
    console.log('Server running at port 3000')
=======

//setting port
let port = process.env.PORT
if (port == null || port == ""){
    port = 3000;
}
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
>>>>>>> ac95e283622e561bbdbeddf45d1a2ebcbc4b9a1d
})
