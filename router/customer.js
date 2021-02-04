const express=require('express')
const router=new express.Router()
const auth=require('../middleware/authentication')
const User=require('../model/farmer')/*Loading user model */

router.get('/customer',auth,async(req,res)=>{

    res.render('customer')
})
module.exports=router