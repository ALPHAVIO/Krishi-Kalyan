const express=require('express')
const router=new express.Router()
const auth=require('../middleware/authentication')
const User=require('../model/farmer')

router.post('/logout',auth,async (req,res)=>{
    // console.log(req.user)
     try{
      req.user.Tokens=req.user.Tokens.filter((token)=>{
          return token.token!==req.token
      })
      await req.user.save()
     // console.log('user after removing token')
     // console.log(req.user)
      res.redirect('/')
     }
     catch(e)
     {
         console.log(e)
          res.status(500).send()
     }

})
router.post('/logoutall',auth,async (req,res)=>{
  //  console.log(req.user)
    try{
        req.user.Tokens=[]
        await req.user.save()

        res.redirect('/')


   }
   catch(e)
   {
       res.status(500).send()
   }
})
router.post('/delete',auth,async(req,res)=>{
    try{
       await req.user.remove()
       res.redirect('/')
    }
    catch(e)
    {
     res.status(500).send()
    }
})
module.exports=router