const mongoose = require("mongoose");
 const { ObjectCartId }=mongoose.Types;
const {Product,ObjectProductId}=require('./product');
// const {merchantProfile,ObjectId}=require('./merchantProfile');
const {Category,ObjectCategoryId} =require("./category");
const {customerProfile,ObjectId}=require("../model/customerProfile")
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
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
      default: 1
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
    status:{
      type:String
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