const Product = require('../controllers/product.controller')
const Auth = require('../middlewares/auth')

module.exports = (app) =>{
    app.get('/v1/products',Auth, Product.productShowAll)
    app.get('/v1/products/:id',Auth, Product.productShowById)
    app.post('/v1/products',Auth, Product.createProduct)
    app.put('/v1/products/:id',Auth, Product.productUpdate)
    app.delete('/v1/products/:id',Auth, Product.productDelete)
}