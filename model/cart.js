 const mongoose = require("mongoose");
const {Product,ObjectProductId}=require('./product');
// const {merchantProfile,ObjectId}=require('./merchantProfile');
const {Category,ObjectCategoryId} =require("./category")

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
const cartSchema = new mongoose.Schema({
customer:{ type: mongoose.Schema.Types.ObjectId,
   ref: 'Customer',
   required: true },
  cartItems:
  [
    {
        product:
         { type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', required: true
         },
        quantity:
        { type: Number,
           default: 1
          },
         price:{type:Number},
        // totalQty: {
        //   type: Number,
        //   default: 0,
        //   required: true,
        // },
      }],
totalCost: {
  type: Number,
  default: 0,
  required: true,
}
},{timestamps:true});

module.exports = mongoose.model("Cart", cartSchema);