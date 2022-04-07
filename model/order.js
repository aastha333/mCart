const mongoose=require("mongoose")
const { ObjectOrderId }=mongoose.Types;
const {Product,ObjectProductId}=require('../model/product');
//const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const {customerProfile,ObjectId} =require("../model/customerProfile")

const orderSchema=new mongoose.Schema({
    customerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "customerProfile",
    },
    // customerName:{
    //      type:String
    //  },
     
    items: 
        {type:Array,
        required:true},
      address: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'customerProfile'
        //required: true,
      },
      transactionId: {
        type: String,
        //required: true,
      },
      totalCost:{
        type:Number,
      },
      status: {
        type: String,
        enum:['Payment Incomplete','Accepted','Ordered','Packed','Shipped','Delivered','Cancelled','Refund Proceeding','Refunded']
       },
     
     
    })
module.exports=
{
    Order:mongoose.model("Order",orderSchema),
    ObjectOrderId
}