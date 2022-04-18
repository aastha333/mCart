const bodyparser=require('body-parser');
const {Product,ObjectProductId}=require('../model/product');
//const {Category,ObjectCategoryId}=require('../model/category');
const {customerProfile,ObjectId}=require('../model/customerProfile');
// const auth=require('../middleware/auth_customer');
const {Cart,ObjectCartId}=require('../model/cart');
// const addProductToCart =(req, res, next) => {

//   // Using mongoose in-built function "findbyID"
// Product.findById({_id : req.params.productId}).then( item => 
// {
//   if (!item) {res.status(400).send({message : "item not found"})}
//   Cart.findByIdAndUpdate(req.params.customerId,
//   {
//       total_quantity : 0,
//       total_price : 0,
//       final_price : 0,
//       "$push": {"items": {
//               // Passing Data
//               productid : item._id,
//               MRP : item.baseCost,
//               finalprice : item.discountedprice,
//               discount :  item.discount,
//               categoryName : item.categoryName,
//               brandName : item.brandName,
//               size : item.size,
//               shortDescription : item.shortDescription,
//               longDescription : item.longDescription
//           }
//       },
//       customerId : req.params.customerId   
//   },
//       { upsert: true, returnNewDocument : true}
//   ).then(() => {
//       res.status(200).send({message: "product added to cart"});
//       }).catch(err => {
//           res.status(500).send(err);
//       });
// }).catch (err => {
//   res.status(500).send("item fetch related issue found", err);
// });
// };

const addToCart = async (req, res, next) => {
try{
const customerId= req.customer;
const productId=req.query.productId;
let data = null;

const quantity = Number.parseInt(req.query.quantity);

let cart = await Cart.findOne({ customerId: customerId}); 
const productDetails = await Product.findById(productId);

if(productDetails.quantity>quantity){
if (cart){
    let indexFound = cart.items.findIndex(p => p.productId == productId);
    
    if (indexFound != -1) {
        cart.items[indexFound].quantity = parseInt(cart.items[indexFound].quantity + quantity);
        cart.items[indexFound].total = parseInt(cart.items[indexFound].quantity * productDetails.discountedCost);
        cart.items[indexFound].baseCost = productDetails.baseCost
        cart.subTotal = parseInt(cart.items.map(item => item.total).reduce((acc, curr) => acc + curr));
    }
  
    else if (quantity > 0) {
        cart.items.push({
            productId: productId,
            productName:productDetails.productName,
            quantity: quantity,
            baseCost: productDetails.baseCost,
            discountedCost: productDetails.discountedCost,
            size:productDetails.size,
            shortDescription: productDetails.shortDescription,
            longDescription: productDetails.longDescription,
            categoryId:productDetails.categoryId,
            brandId:productDetails.brandId,
            available:productDetails.available,
            total: parseInt(productDetails.discountedCost * quantity),
        })
        cart.subTotal = parseInt(cart.items.map(item => item.total).reduce((acc, curr) => acc + curr));
    }
  
    else {
        return res.status(400).json({
            code: 400,
            message: "Invalid request"                
        })
    }

    data = await cart.save();
}

else {
    const cartData = {
        customerId: customerId,
        items: [{
            productId: productId,
            productName:productDetails.productName,
            quantity: quantity,
            baseCost: productDetails.baseCost,
            discountedCost: productDetails.discountedCost,
            discount: productDetails.discount,
            total: parseInt(productDetails.discountedCost* quantity),
            
            shortDescription:productDetails.shortDescription,
            longDescription:productDetails.longDescription,
            categoryId:productDetails.categoryId,
            brandId:productDetails.brandId,
            available:productDetails.available
           
            
        }],
        subTotal:parseInt(productDetails.discountedCost * quantity)
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
else{
    res.json("Product is not available")
}
}
catch(err){
      res.json(err)
}
}
const getCart=async (req,res)=>{
    try{
        await Cart.findOne({customerId:ObjectId(req.customer)}).then((data)=>{
            if(data){
                res.json(data);
            }
            else{
                res.json("Cart is Empty!");
            }
        })
    }
    catch(err){
        res.json(err)
    }
}
const deleteFromCart = async(req, res) => {
  try{
  await Cart.findOneAndUpdate({customerId : ObjectId(req.customer)}, { $pull: { items : {productId: ObjectId(req.query.productId) }}}, {multi: true}).then(data=>{
    res.json(data)
  })
  }
  catch(err){
    res.json(err);
  }
  };
  const updateQuantity=async function(req,res){
    try{
        const cart=await Cart.findOne({customerId:req.customer})
        console.log(cart)
        //quant=Number(cart.quantity)
        //console.log(typeof (quant))
        //quantity=Number(quant+Number(req.query.add))
        //total=(quantity*cart.discountedCost)
        if(cart.customerId==req.customer){
                await Cart.updateOne( { 'items.productId': req.query.productId},
            {$set:{'items.$.quantity':req.query.add,'items.$.total':parseInt(Number.parseInt(req.query.add)*parseInt(cart.discountedCost))}}).then(result=>{
           //data.save()
           res.json(result)
         })
            }
            else{
                res.json("Cart is empty")
            }
            
        }
    catch(err){
      res.json(err)
    }
}
const emptyCart=async function(req,res){
        try{
            await Cart.findOneAndDelete({customerId:ObjectId(req.customer)}).then((data)=>{
                if(data){
                    res.send({
                        "response":"Successfully Deleted!",
                        "data":data
                     } );
                }
                else{
                    res.json("Already Empty!")
                }
               
            })
        }
        catch(err){
            res.json(err)
        }
}

      module.exports={
         addToCart,
         deleteFromCart,
         updateQuantity,
         emptyCart,
         getCart
     }
