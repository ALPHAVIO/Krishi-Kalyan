const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/KRISHI-KALYAN', {
    useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true},(error,client)=>{
        if(error)
        return console.log('unable to connect through mongoose')

        console.log('connected to mongoose')
    });