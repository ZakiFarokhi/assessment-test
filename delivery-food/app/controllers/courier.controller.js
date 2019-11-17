require('dotenv').config()
const Courier = require('../models/courier.model')
const bcrypt = require('bcrypt')
const Response = require('../middlewares/response')
const jwt = require('jsonwebtoken')

//create user || signup
exports.courierCreate = (req, res) => {
    Courier.findOne({email:req.body.email}) // checking email if exist in another account
    .then(courier=>{
        console.log(courier.email)
        Response(res, "error", null, "email is taken")
    }).catch(()=>{
        var newCourier = new Courier({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_SALT)),
            created_at : Date.now(),
            updated_at : Date.now()
        })
        newCourier.save()      //save user was created in newUser variabel and save to database
        .then(createdCourier =>{
            var token = jwt.sign({ //generate token with jsonwebtoken for authentication
                id:createdCourier._id,
                email:createdCourier.email
            }, process.env.JWT_SECRET)
            Response(res, "OK", {createdCourier, token}, null)
        }).catch(err =>{
            Response(res, "error", null, err)
        })
    })
    
}

// post || login 
exports.courierLogin = (req, res) =>{
    Courier.findOne({email :req.body.email}) //find an email from all account 
    .then(courier =>{
        console.log(courier)
        var hash = bcrypt.compareSync(req.body.password, courier.password) //compare body.password v user.password was hashing in database
        console.log(hash)
        if(hash){
            var token = jwt.sign({  ////generate token with jsonwebtoken for authentication
                id:user._id,
                email:courier.email
            }, process.env.JWT_SECRET)
            Response(res, "OK", {courier, token}, null) 
        }else{
            Response(res, "error", null, "wrong password")
        }
    }).catch(err =>{
        Response(res, "error", null, err)
    })
}