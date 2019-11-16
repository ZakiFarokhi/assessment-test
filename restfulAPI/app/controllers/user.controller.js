require('dotenv').config()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const Response = require('../middlewares/response')
const jwt = require('jsonwebtoken')

//create user || signup
exports.userCreate = (req, res) => {
    User.findOne({email:req.body.email}) // checking email if exist in another account
    .then(user=>{
        console.log(user.email)
        Response(res, "error", null, "email is taken")
    }).catch(()=>{
        var newUSer = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_SALT)),
            created_at : Date.now(),
            updated_at : Date.now()
        })
        newUSer.save()      //save user was created in newUser variabel and save to database
        .then(createdUser =>{
            var token = jwt.sign({ //generate token with jsonwebtoken for authentication
                id:createdUser._id,
                email:createdUser.email
            }, process.env.JWT_SECRET)
            Response(res, "OK", {createdUser, token}, null)
        }).catch(err =>{
            Response(res, "error", null, err)
        })
    })
    
}

// post || login 
exports.userLogin = (req, res) =>{
    User.findOne({email :req.body.email}) //find an email from all account 
    .then(user =>{
        console.log(user)
        var hash = bcrypt.compareSync(req.body.password, user.password) //compare body.password v user.password was hashing in database
        console.log(hash)
        if(hash){
            var token = jwt.sign({  ////generate token with jsonwebtoken for authentication
                id:user._id,
                email:user.email
            }, process.env.JWT_SECRET)
            Response(res, "OK", {user, token}, null) 
        }else{
            Response(res, "error", null, "wrong password")
        }
    }).catch(err =>{
        Response(res, "error", null, err)
    })
}