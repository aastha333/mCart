const bodyparser=require('body-parser');
const { status } = require('express/lib/response');
const { Cart,ObjectCartId } = require('../model/cart');
const { customerProfile,ObjectId } = require('../model/customerProfile');
const { Order,ObjectOrderId } = require('../model/order');
const {Payment,ObjectPaymentId}=require('../model/payment')
const crypto=require('crypto');
//const { pid } = require('process');
//const cart = require('../model/cart');
//const { ObjectId } = require('../model/merchantProfile');

const orderProduct=async(req,res)=>{
    try{
        var customerId=req.query.customerId;
        var paymentId=req.query.paymentId;
        const addressId=req.query.addressId;
        //await customerProfile.findOne({_id:ObjectId(customerId)}).then(data=>{})
        
        const cart = await Cart.findOne({ customerId: customerId});
        
        //console.log(cart);
        let indexFound = cart.items.findIndex(p => p.customerId == customerId);
        //await customerProfile.findOne({_id:ObjectId(customerId)}).populate("address").then({
        await Cart.deleteOne({ customerId: customerId })
        .then(()=>{
            if(cart){
                var status='Ordered'
                const orderdata={
                customerId:customerId,
                items:cart.items,
                status:status,
                totalCost:cart.subTotal,
                address:addressId,
                transactionId:transactionId

                }
                const order=new Order(orderdata);
                 order.save().then(()=>{
                    res.send('Order Successfully! Please initiate Payment!');
                })

            }
            else{
                res.json("Add to cart");
            }
            
        })

    }catch(err){
        res.json(err);
    }
}

const updateOrderStatus=async(req,res)=>{
    try{
        await Order.findOne({_id:ObjectId(req.query.orderId)}).then(async data=>{
            if(data){
            data.status=req.body.status;
            await data.save().then((result)=>{
                res.json(result)
            })
            }
            else{
                res.json("order not placed");
            }
        })    
    }
    catch(err){
        res.json(err)
    }
}
const cancelOrder=async(req,res)=>{
    try{
        await Order.findOne({_id:ObjectId(req.query.orderId),customerId:req.query.customerId}).then(async data=>{
            if(data){

                data.status='Cancelled';
                res.json("Refund Initiated")
            }
            else{
                res.json("No order is placed!")
            }
        })
    }
    catch(err){
        res.json(err)
    }
}


module.exports={
   orderProduct,
   updateOrderStatus,
   cancelOrder
}