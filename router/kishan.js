const express = require('express')
const bodyParser = require('body-parser')
const router = new express.Router()
router.use(bodyParser.urlencoded({
    extended: true
})) /*This is used to parse body of request */
router.use(express.json()) /*This is used to automatically parse json data */

const User = require('model/farmer') /*Loading user model */


router.get('', async (req, res) => {
    res.render('home')
})
router.get('/kishan', async (req, res) => {
    res.render('kishan')
    
})


/*router.get('/register',async(req,res)=>{
    res.render('register')
})

router.get('/login',async(req,res)=>{
    res.render('login',{message:''})
})
router.get('/update',async(req,res)=>{
    res.render('update')
})
////////////////////////////////////////////////////
router.post('/register',async(req,res)=>{
    console.log(req.body)
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


router.post('/login',async(req,res)=>{
    //console.log(req.body)
    const email=req.body.username
    try{
          const user=await User.findByCredential(req.body)
          console.log(user)
         res.render('kishan')
    }
    catch(e)
    {
        console.log(e)
        message='Either Username Or password is wrong'
         res.render('login',{message:message})
    }
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
})*/

module.exports = router