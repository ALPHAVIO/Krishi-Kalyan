const express=require('express')
const router=new express.Router()
const User=require('../model/farmer')/*Loading user model */


router.get('',async(req,res)=>{
    var message=''
    res.render('home',{message})
})

module.exports=router