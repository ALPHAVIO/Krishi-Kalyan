require('dotenv').config()
const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost:27017/Krishi-Kalyan', {
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error)
        return console.log('unable to connect through mongoose: ', error)

    console.log('connected to mongoose')
});