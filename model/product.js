const mongoose=require("mongoose")
const { ObjectProductId } = mongoose.Types;
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const {Category,ObjectCategoryId} =require('../model/category');
const {Brand,ObjectBrandId}=require('../model/brand')

const productSchema = new mongoose.Schema({
    
    productName:{
        type:String,
        required:true
    },
    baseCost:{
        type:Number,
        required:true
    },

    discountedCost:{
        type:Number,
        required:true
    },
    discount:{
        type:Number
    },
    shortDescription:{
        type:String,
        minlength:10,
        maxlength:100
    },
    longDescription:{
        type:String,
        minlength:50,
        maxlength:500
    },
    quantity:{
        type:Number,
        min:0
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    size:{
        type:String,
        uppercase:true,
        enum:['S','M','L','XL','XXL','NA']
    },

    available: {
        type: Boolean,
        required: true,
      },

     createdAt:{
        type:Date,
        default:Date.now()
    },
   
    MerchantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'merchantProfile'
    } 
    
})
//ObjectId=ObjectProductId;
module.exports=
{
    Product:mongoose.model("Product",productSchema),
    ObjectProductId
}