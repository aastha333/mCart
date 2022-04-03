const bodyparser=require('body-parser');
const {Product,ObjectProductId}=require('../model/product');
const {Category,ObjectCategoryId}=require('../model/category');
const {customerProfile,ObjectId}=require('../model/customerProfile');
const auth=require('../middleware/auth_customer')

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
const addToCart = async (req, res) => {
    const cart = new Cart({
       customer:req.user._id,
       Items:req.body.Items,
    //   // product:req.body.product,
    //              quantity:req.body.quantity,
    //               price:req.body.price,
    //                totalQuantity:(req.body.quantity*req.body.price)
    })
    cart.save((error,cart)=>{
        if(error) return res.status(400).json({error})
        if(cart){
            return res.status(201).json({cart})
        }
    })
     }
     module.exports={
         addToCart
     }
