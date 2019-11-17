require('dotenv').config()
const Order = require('../models/order.model')
const User = require('../models/user.model')
const Courier = require('../models/courier.model')
const bcrypt = require('bcrypt')
const Response = require('../middlewares/response')
const jwt = require('jsonwebtoken')
const History = require('../models/historyOrder.model')

//order create by user or restaurant
exports.OrderCreate = (req, res) =>{
    const newOrder = new Order({
        destination : req.body.destination,
        user : req.user._id,
        courier : req.courier._id
    })
    try{
        newOrder.save()
        const courier =  Courier.findById(newOrder.courier)
        const user =  User.findById(newOrder.user)
        courier.order = newOrder
        courier.save()
        user.order = newOrder
        user.save()
        Response(res,"OK",newOrder, null)
    } catch{

    }
}

exports.OrderDelete = (req, res) =>{
    const newHistory = new History({
        status: req.body.status,
        order: req.order._id
    })
    try{
         newHistory.save()
         Order.findByIdAndRemove(newHistory.order, {useFindAndModify:false})
        .then(order =>{
            try{
                 User.findByIdAndUpdate(req.user._id, {$pull:{order:{$in:order._id}}})
                 Courier.findByIdAndUpdate(req.courier._id, {$pull:{order:{$in:order._id}}})
                 Response(res, "OK", order, null)
            }catch{
                Response(res, "error", null, "cannot finished order") 
            }
            
        }).catch(err =>{
            Response(res, "error", null, err)
        })
        
    }catch{
        Response(res, "error", null, "error")
    }
}