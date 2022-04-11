 const mongoose = require("mongoose");
 const { ObjectCartId }=mongoose.Types;
const {Product,ObjectProductId}=require('./product');
// const {merchantProfile,ObjectId}=require('./merchantProfile');
const {Category,ObjectCategoryId} =require("./category");
const {customerProfile,ObjectId}=require("../model/customerProfile")

// const cartSchema = new mongoose.Schema({
//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//       },
//     //   categoryId:{
//     //     type:mongoose.Schema.Types.ObjectId,
//     //     ref:'Category'
//     // },
//     productName:{
//         type:String,
//         required:true
//     },
//     baseCost:{
//         type:Number,
//         required:true
//     },

//     discountedCost:{
//         type:Number,
//         required:true
//     },
//     discount:{
//         type:Number
//     },
//     shortDescription:{
//         type:String
//     },
//     longDescription:{
//         type:String
//     },
//     quantity:{
//         type:Number,
//         required:true
//     },
//     brandName:{
//         type:String
//     },
//     size:{
//         type:String,
//         uppercase:true,
//         enum:['S','M','L','XL','XXL']
//     },
//     available: {
//         type: Boolean,
//         required: true,
//       }
//     }],
//   totalQty: {
//     type: Number,
//     default: 0,
//     required: true,
//   },
//   totalCost: {
//     type: Number,
//     default: 0,
//     required: true,
//   },
//   customerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "customerProfile"
//   }
// });

const Schema = mongoose.Schema;

let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    productName:{
      type:String
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    brandId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Brand'
    },
    categoryId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category'
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

    baseCost: {
      type: Number,
      //required: true,
    },
    discount:{
      type:Number,

    },
    discountedCost:{
      type:Number
    },
    size:{
      type:String,
      uppercase:true,
      enum:['S','M','L','XL','XXL']
    },
    
    
    total: {
      type: Number,
      //required: true,
    },
   
  },
  {
    timestamps: true,
  }
);
// module.exports ={
//   item:mongoose.model("item", ItemSchema),
//   ObjectCartId
// }


const cartSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerProfile",
    },

    items: [ItemSchema],

     subTotal: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Cart:mongoose.model("Cart",cartSchema),
    ObjectCartId
}