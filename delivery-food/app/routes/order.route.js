const Auth = require('../middlewares/auth')
const AuthCourier = require('../middlewares/authCourier')
const Order = require('../controllers/order.controller')

module.exports = (app) =>{
    app.post('/order/create', Auth,Order.OrderCreate)
    app.post('/order/finished', AuthCourier,Order.OrderDelete)
}