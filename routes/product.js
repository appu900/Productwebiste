const router = require('express').Router();
let products = require('../productData')
const apiKeyValidation = require('../Middlewires/apiKey');
const ErrorHandler = require('../errors/ErrorHandler');



router.get('/product',(request,response)=>{
    response.render('products',{
        title:'product page',
    })
})




router.get('/api/productslist',(request,response)=>{
    response.json(products)
})

router.post('/api/productslist',(request,response,next)=>{
    const {name,price} = request.body;
    // if(!name || !price){return response.status(422).json({error:'all fields require'})};
    if(!name || !price){
        // throw new Error("All fields are required")
        next(ErrorHandler.validationError("name and price fields are required"));
    }
    const RequestedProduct = {
        name:name,
        price:price,
        id: new Date().getTime().toString()
    }

    products.push(RequestedProduct);
    response.json(RequestedProduct);

})

router.delete('/api/productslist/:productid',(req,res)=>{
    // products = products.filter((product) => req.params.productid != product.id);
    products = products.filter((product)=> product.id != req.params.productid);
    res.json({status:'OK'});
})





module.exports = router;