
const jwt=require('jsonwebtoken')
const User = require('../model/farmer')

const auth=async (req,res,next)=>{
    console.log("Authorization is going on")
    try{
        //console.log(req.cookies)
        const token=req.cookies.jwt
        //console.log(token)
        const decode_token=jwt.verify(token,'thisismyapp')
       // console.log(decode_token)
       
         const user=await User.findOne({_id:decode_token._id,'Tokens.token':token})
         if(!user)
         throw new Error('No user found')
         else{
         
            console.log(user)
             req.user=user
             next()
         }
    }
    catch(e)
    {
        console.log(e)
        message='Please do authentication'
        res.render('home',{message:message})
    }
}

module.exports=auth