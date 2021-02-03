const express=require('express')
const router=new express.Router()
const auth=require('../middleware/authentication')
const User=require('../model/farmer')

router.post('/logout',auth,async (req,res)=>{
     console.log(req.user)
     try{
      req.user.Tokens=req.user.Tokens.filter((token)=>{
          return Tokens.token!==req.token
      })
      await req.user.save()
      res.redirect('/home')
     }
     catch(e)
     {
          res.status(500).send()
     }

})
router.post('/logoutall',auth,async (req,res)=>{
    console.log(req.user)
    try{
        req.user.Tokens=[]
        await req.user.save()

        res.redirect('/home')


   }
   catch(e)
   {
       req.status(500).send()
   }
})