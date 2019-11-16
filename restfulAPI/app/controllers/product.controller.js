require('dotenv').config()
const Product = require('../models/product.model')
const bcrypt = require('bcrypt')
const Response = require('../middlewares/response')

//get product All
exports.productShowAll = (req, res) =>{
    Product.find({})   //Query mongodb to find All in collection Product
    .then(allProduct =>{
        Response(res, "OK", allProduct, null)
    }).catch(err =>{
        Response(res, "error", null, err)   
    })
}

//get Product by Id
exports.productShowById = (req, res) =>{
    Product.findById(req.params.id) //Query mongodb to find Product by ID product
    .then(product =>{
        Response(res, "OK", product, null)
    }).catch(err =>{
        Response(res, "errors", null, err)
    })
}

// post || create product 
exports.createProduct = (req, res) =>{ 
    Product.findOne({name:req.body.name}) //checking product if exist
    .then(() =>{
        console.log(product)
        Response(res, "error", null, "product already exist")
    }).catch (() =>{
        var newProduct = new Product({
            name:req.body.name,
            price:req.body.price,
            imageUrl:req.body.imageUrl,
            created_at : Date.now(),
            updated_at: Date.now()
        })
        newProduct.save()           //save product was create in collection
        .then(createdProduct =>{
            Response(res, "OK", createdProduct, null)
        }).catch(err =>{
            Response(res, "errors", null, err)
        })
    })
}

//update product 
exports.productUpdate = (req, res)=>{
    var updateProduct = req.body            //save  All data from body to variabel
    updateProduct.update_at = Date.now()    //get date now automatically 
    Product.findByIdAndUpdate(req.params.id, {  //Query for get product with specific id and update
        $set: updateProduct                     //update product with variabel was include all body
    }, {
        new:true,                               //show uptodate data
        useFindAndModify: false
    }).then(updated =>{
        Response(res, "OK", updated, null)
    }).catch(err =>{
        Response(res, "error", null, err)
    })
}

//delete product 
exports.productDelete = (req,res) =>{
    Product.findByIdAndRemove(req.params.id, {useFindAndModify:false}) //query for find Product by id and delete it
    .then(data =>{
        if(data){Response(res, "OK", "product deleted", null)}
        else{Response(res, "error", null, "cannot delete product")}
    }).catch(err =>{
        Response(res, "error", null, err)
    })
}