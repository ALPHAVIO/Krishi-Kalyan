const express=require('express')
const bodyParser=require('body-parser')
const router=new express.Router()
router.use(bodyParser.urlencoded({extended:true}))/*This is used to parse body of request */
router.use(express.json())/*This is used to automatically parse json data */

const User=require('../model/farmer')/*Loading user model */
router.get('/register',async(req,res)=>{
    res.render('register')
})

router.post('/register',async(req,res)=>{
    //console.log(req.body)
     const user=new User(req.body)
     try{
       await user.save()
       res.redirect('/kishan')
     }
     catch(e){
         console.log(e)
       res.redirect('/register')
     }
     
})

module.exports=router