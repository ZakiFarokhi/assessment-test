const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Response = require('../middlewares/response')

module.exports = async (req, res, next)=>{
    if(req.header('Authorization')){
        jwt.verify(req.header('Authorization'), process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                Response(res,"Error", null,err)
            }else{
                User.findById(decode.id)
                .then(user =>{
                    next()
                }).catch(errorUser=>{
                    Response(res, 'error', null, "user not found")
                })
            }
        })
    }else{
        Response(res, 'error', null, "token is required")
    }
}