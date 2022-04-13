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
        [{   productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        productName:{
          type:String
        },
        quantity: {
          type: Number,
          required: true,
          //min: [1, "Quantity can not be less then 1."],
        },
        categoryName:{
          type:String
        },
        brandName:{
          type:String
        },
        shortDescription:{
          type:String
        },
        longDescription:{
          type:String
        },
        available:{
          type:Boolean
        },
        price: {
          type: Number,
          //required: true,
        },
        size:{
          type:String,
          uppercase:true,
          enum:['S','M','L','XL','XXL']
        },
        discountedCost:{
          type:Number
        },
        discount:{
          type:Number
        },
        total: {
          type: Number,
          //required: true,
        },
        status:{
          type:String
        },
        
      }],
      totalCost:{
        type:Number,
      },
      address: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'customerProfile'
        //required: true,
      },
      transactionId: {
        type: String,
        //required: true,
      },
      
      status: {
        type: String,
        enum:['Payment Incomplete','Accepted','Ordered','Packed','Shipped','Delivered','Cancelled','Refund Proceeding','Refunded']
       },
     
     
    },
    {
      timestamps: true,
    },)
module.exports=
{
    Order:mongoose.model("Order",orderSchema),
    ObjectOrderId
}