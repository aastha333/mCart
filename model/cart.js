 const mongoose = require("mongoose");
const {Product,ObjectProductId}=require('./product');
// const {merchantProfile,ObjectId}=require('./merchantProfile');
const {Category,ObjectCategoryId} =require("./category");
const {Customer,ObjectId}=require("../model/customerProfile")

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
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("item", ItemSchema);

const CartSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    items: [ItemSchema],

     total: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);