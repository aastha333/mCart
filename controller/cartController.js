const bodyparser=require('body-parser');
const {Product,ObjectProductId}=require('../model/product');
//const {Category,ObjectCategoryId}=require('../model/category');
const {customerProfile,ObjectId}=require('../model/customerProfile');
// const auth=require('../middleware/auth_customer');
const {Cart,ObjectCartId}=require('../model/cart');
//const product = require('../model/product');



// const addToCart=async function(res,req){
//     try
//     {   
//         await customerProfile.findOne({_id:ObjectId(req.query.id)}).then(value=>{
//         var customerId=value._id;
//         Product.findOne({_id:ObjectId(req.query.id)},{"productName":1}).then(async (data)=>
//         {
//         if(data.quantity>0) 
//         {   
//             var productId=data._id
//             var productName=data.productName;
//             var baseCost=data.baseCost;
//             var discount=data.discount;
//             var shortDescription=data.shortDescription;
//             var longDescription=data.longDescription;
//             var categoryName=data.categoryName;
//             var brandName=data.brandName;
//             var quantity=data.quantity;
//             var Quantity=req.body.Quantity;
//             var available=avail(quantity,Quantity-quantity);
            
//             function avail(q,r){
//                 if(q>=r){
//                     console.log("1");
//                     return true;
//                 }
//                 else{
//                     console.log("0");
//                     return false;
//                 }
//             }

//             var product=new Product([{
//             productId:productId,
//             productName:productName,
//             baseCost:baseCost,
//             discount:discount,
//             discountedCost:(baseCost-(discount*baseCost/100)),
//             shortDescription:shortDescription,
//             longDescription:longDescription,
//             quantity:quantity,
           
//             categoryName:categoryName,
//             //currency:req.body.currency,
//             brandName:brandName,
//             size:req.body.size,
//             available:available,
//             createdAt:createdAt,
//         }])
        
//             await product.save().then((data)=>{
//                 console.log(product);
               
//                 res.status(200).send ({
//                     "status": "true",
//                     "msg": "Successfully Added",
//                     "response": data,
//                     "code":200,
//                     "error": {
//                     },
//                 })
//             })
        
//         }
        
        
//     })
// })
// }
//     catch(error){
//         res.status(500).json(
//         {
//             "status": true,
//             "response": null,
//             "code": 200,
//             "error": {
//             "errCode": "FAILED",
//             "errMsg": "Failed to ADD"
//             },
//         })
//     }   
// }
const addToCart = async (req, res, next) => {

const { customerId, productId } = req.body;
let data = null;

const quantity = Number.parseInt(req.body.quantity);

let cart = await Cart.findOne({ customerId: customerId}); 
const productDetails = await Product.findById(productId);

console.log("productDetails", productDetails)

//-- Check if cart Exists and Check the quantity if items -------
if (cart){
    let indexFound = cart.items.findIndex(p => p.productId == productId);
    console.log("Index", indexFound)
    //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
    if (indexFound != -1) {
        cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.discountedCost;
        cart.items[indexFound].price = productDetails.discountedCost
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr);
    }
    //----Check if Quantity is Greater than 0 then add item to items Array ----
    else if (quantity > 0) {
        cart.items.push({
            productId: productId,
            quantity: quantity,
            baseCost: productDetails.baseCost,
            discountedCost: productDetails.discountedCost,
            shortDescription: productDetails.shortDescription,
            longDescription: productDetails.longDescription,
            available:productDetails.available,
            total: parseInt(productDetails.price * quantity).toFixed(2),
        })
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, curr) => acc + curr);
    }
    //----if quantity of price is 0 throw the error -------
    else {
        return res.status(400).json({
            code: 400,
            message: "Invalid request"                
        })
    }

    data = await cart.save();
}
//------if there is no user with a cart then it creates a new cart and then adds the item to the cart that has been created---------
else {
    const cartData = {
        customerId: customerId,
        items: [{
            productId: productId,
            quantity: quantity,
            total: parseInt(productDetails.discountedCost* quantity),
            price: productDetails.discountedCost,
            shortDescription:productDetails.shortDescription,
            longDescription:productDetails.longDescription,
            available:productDetails.available
            //note: note
            
        }],
        subTotal: parseInt(productDetails.discountedCost * quantity)
    }
    cart = new Cart(cartData);
    data = await cart.save();
}

return res.status(200).send({ 
    code: 200,
    message: "Add to Cart successfully!",
    data: data
});
}
      module.exports={
         addToCart
     }
