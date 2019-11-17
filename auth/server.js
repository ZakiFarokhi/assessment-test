require('dotenv').config()
var express = require('express')
var app = express()
var PORT = process.env.PORT || 3003
var cors = require('cors')
var bodyParser = require('body-parser')

const config_server = process.env.LOCAL_MONGO

const mongoose = require('mongoose');
mongoose.connect(config_server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 });

app.get('/', (req, res)=>{
    res.json({
        status: "OK",
        result: "Welcome to Binar Test",
        errors: null
    })
})

app.use(cors())
app.use(bodyParser.json())

//API
require('./app/routes/user.route')(app)


app.listen(PORT, ()=>{
    console.log('listening on Port' + PORT)
})