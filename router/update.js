const express=require('express')
const bodyParser=require('body-parser')
const router=new express.Router()
router.use(bodyParser.urlencoded({extended:true}))/*This is used to parse body of request */
router.use(express.json())/*This is used to automatically parse json data */

const User=require('../model/farmer')/*Loading user model */
router.get('/update',async(req,res)=>{
    res.render('update')
})
router.post('/update',async(req,res)=>{
    const updates=Object.keys(req.body)
    console.log(req.body)
    console.log(updates)
    var allowedUpdate=[]
    updates.forEach((update)=>{
      
        if(req.body[update]!='')
        {
          allowedUpdate.push(update)
        }
    })
        console.log(allowedUpdate)
        const username=req.body.username
        try{
            const kishan=await User.findOne({username})
       
            allowedUpdate.forEach((update)=>{
                kishan[update]=req.body[update]
            })
            await kishan.save()
            res.render('kishan')
        }
        catch(e)
        {
            console.log(e)
            res.render('update')
        }
})

module.exports=router