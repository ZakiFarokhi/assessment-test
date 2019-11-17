const User = require('../controllers/user.controller')
const Auth = require('../middlewares/auth')

module.exports = (app) =>{
    app.post('/auth/signup', User.userCreate)
    app.post('/auth/login', User.userLogin)
}