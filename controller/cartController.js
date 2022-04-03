const bodyparser=require('body-parser');
const {Product,ObjectProductId}=require('../model/product');
const {Category,ObjectCategoryId}=require('../model/category');
const {customerProfile,ObjectId}=require('../model/customerProfile');
const auth=require('../middleware/auth_customer');
const item=require('../model/cart');


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
const addToCart = async function(req, res) {
    const {
        customerId,
        productId
    } = req.body;
    const quantity = Number.parseInt(req.body.quantity);

    try {
        // -------Get users Cart ------
        let cart = await Cart.findOne({
            userId: userId
        })

        //-----Get Selected Product Details ----
        const productDetails = await Product.findById(productId);

        //-- Check if cart Exists and Check the quantity if items -------
        if (!cart && quantity item.productId == productId);

            //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  --------
            if (indexFound !== -1 && quantity  item.total).reduce((acc, next) => acc + next);
            }

            //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
            else if (indexFound !== -1) {
                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                cart.items[indexFound].price = productDetails.price
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }

            //----Check if Quantity is Greater than 0 then add item to items Array ----
            else if (quantity > 0) {
                cart.items.push({
                    productId: productId,
                    quantity: quantity,
                    price: productDetails.price,
                    total: parseInt(productDetails.price * quantity)
                })
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            //----if quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process Successful",
                data: data
            })
        }
        //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
        else {
            const cartData = {
                userId: userId,
                items: [{
                    productId: productId,
                    quantity: quantity,
                    total: parseInt(productDetails.price * quantity),
                    price: productDetails.price
                }],
                subTotal: parseInt(productDetails.price * quantity)
            }
            cart = new Cart(cartData);
            let data = await cart.save();
            res.json(data);
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}
     module.exports={
         addToCart
     }
