const Courier = require('../controllers/courier.controller')

module.exports = (app) =>{
    app.post('/auth/signupCourier', Courier.courierCreate)
    app.post('/auth/loginCourier', Courier.courierLogin)
}