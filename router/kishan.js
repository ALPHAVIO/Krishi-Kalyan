const express=require('express')
const router=new express.Router()
const auth=require('../middleware/authentication')
const User=require('../model/farmer')/*Loading user model */


router.get('',async(req,res)=>{
    var message=''
    res.render('home',{message})
})

router.get('/kishan',auth,async(req,res)=>{

    res.render('kishan')
})
module.exports=router