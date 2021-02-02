const express=require('express')
const router=new express.Router()

const User=require('../model/farmer')/*Loading user model */

router.get('/login',async(req,res)=>{
    var message=''
    res.render('login',{message})
})
router.post('/login',async(req,res)=>{
   
    const email=req.body.username
    try{
          const user=await User.findByCredential(req.body)/**Try to find out whether user exist or not */
          const token=await user.generateAuthToken()/**Generate authentication token */
      
          res.cookie('jwt',token)/**Saving authentication into cookies */
         //console.log(req.cookies.jwt)
         res.redirect('/kishan')
    }
    catch(e)
    {
        console.log(e)
        message='Either Username Or password is wrong'
         res.render('login',{message:message})
    }
})

module.exports=router