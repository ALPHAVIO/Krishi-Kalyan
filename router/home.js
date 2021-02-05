const express=require('express')
const router=new express.Router()
const auth=require('../middleware/authentication')
const User=require('../model/farmer')/*Loading user model */


router.get('',async(req,res)=>{
    var message=''
    res.render('home',{message})
})

router.post('/start',auth,(req,res)=>{
  // console.log(req.user)
   if(req.user.userType=='Farmer')
    res.redirect('/kishan')
    else
    res.redirect('/customer')

})
module.exports=router