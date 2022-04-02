const mongoose=require("mongoose")
const { ObjectOrderId }=mongoose.Types;
const {Product,ObjectProductId}=require('../model/product');
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const {Category,ObjectCategoryId} =require("../model/category")

const orderSchema=new mongoose.Schema({
    // customerId: {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: "Profile",
    // },
    customerName:{
         type:String
     },
     
    items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
        //   categoryId:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Category'
        // },
        productName:{
            type:String,
            required:true
        },
        discountedCost:{
            type:Number,
            required:true
        },
        shortDescription:{
            type:String
        },
        quantity:{
            type:Number,
            required:true
        },
        brandName:{
            type:String
        },
        size:{
            type:String,
            uppercase:true,
            enum:['S','M','L','XL','XXL']
        }
        }],
      address: {
        type: String,
        required: true,
      },
      paymentId: {
        type: String,
        required: true,
      },
    //   orderStatus:{
    //     type:String,
    //     enum:['Pending','Delivered']
    //   },
      Delivered: {
        type: Boolean,
        default: false,
      }
    })
module.exports=
{
    Order:mongoose.model("Order",orderSchema),
    ObjectOrderId
}