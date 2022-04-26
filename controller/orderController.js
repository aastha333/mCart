const bodyparser=require('body-parser');
//const { result } = require('lodash');
//const { status } = require('express/lib/response');
const { Cart,ObjectCartId } = require('../model/cart');
const { customerProfile, ObjectId } = require('../model/customerProfile');
//const { customerProfile,ObjectId } = require('../model/customerProfile');
const { Order,ObjectOrderId } = require('../model/order');
const {Payment,ObjectPaymentId}=require('../model/payment')
//const crypto=require('crypto');
const getCart=async(req,res)=>{
    await Cart.findOne({customerId:req.customer}).then((data)=>{
        if(data){
            res.json(data);
        }
        else{
            res.json("Add to Cart")
        }
    })
  
}

const orderProduct=async(req,res)=>{
    try{
        var customerId=req.customer;
        const addressId=req.query.addressId;
       
        
       const data = await Cart.findOne({ customerId: customerId});
       
        //console.log(data);
        
        await Cart.deleteOne({ customerId: customerId })
        .then((result)=>{
            if(result){
                var item=data.items
                var transactionId='';
                var status='Payment Incomplete';
                //var status='Ordered'
                const orderdata={
                customer:customerId,
                items:item,
                    
                status:status,
                totalCost:data.subTotal,
                address:addressId,
                transactionId:transactionId

                }
                const order=new Order(orderdata);
                 order.save().then((data)=>{
                     res.json(data);
                    res.send('Please initiate Payment to confirm Order!');
                })

            }
            else{
                res.json("Add to Cart to Order");
            }
            
        })

    }catch(err){
        res.json(err);
    }
}

const updateOrderStatus=async(req,res)=>{
    try{
        await Order.findOne({_id:ObjectId(req.query.orderId)}).then(async data=>{
            if(data&&(data.status=='Ordered'||data.status=='Shipped'||data.status=='Packed'||data.status=='Delivered'||data.status=='Cancelled'||data.status=='Refund Proceeding')){
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
        await Order.findOne({_id:ObjectId(req.query.orderId)}).then(async data=>{
            if(data&&data.status!='Payment Incomplete'&&data.status!='Cancelled'&&data.status!='Refund Proceeding'&&data.status!='Refunded'){

               var status='Cancelled';
                data.status=status;
                data.save().then((result)=>{
                    res.json({
                        response:"Refund Initiated",
                        data:result
                    })
                    //res.json(result)
                })
                
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
 const cancelOneProduct=async(req,res)=>{
    try{
        const productId=req.query.productId;
         var Status='Cancelled';
         console.log(Status);
         const order=await Order.findOne({_id:ObjectId(req.query.orderId)});
         console.log(order);
         //,{'items.productId':(req.query.productId)},
        // { $set: {'items.status': status}}).then(async data=>{
        //     if(data){
        //         res.json("Refund Initiated")
        //     }
        //     else{
        //         res.json("You haven't order")
        //     }
        // })
        Order.findOne({_id:ObjectId(req.query.orderId)}).then(data => {
            let indexFound = order.items.findIndex(p => p.productId == productId);
            if(indexFound!=-1){
                order.items[indexFound].status=Status;
            }
            else{
                res.json("can't set status");
            }

         });
    }
    catch(err){
        res.json("error")
    }
}
const orderHistory=async(req,res)=>{
    await Order.find({customer:req.customer})
    .then((data)=>{
        if(data){
            res.json(data)
        }
        else{
            res.json("Nothing Ordered")
        }
    })
}

module.exports={
   orderProduct,
   updateOrderStatus,
   cancelOrder,
   getCart,
   cancelOneProduct,
   orderHistory
}