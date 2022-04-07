const mongoose=require("mongoose")
const { ObjectProductId } = mongoose.Types;
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
//const {Category,ObjectCategoryId} =require('../model/category')

const productSchema = new mongoose.Schema({
    // // categoryId:{
    // //     type:mongoose.SchemaType.ObjectId,
    // //     ref:'Category'
    // // },
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
        minlength:50,
        maxlength:100
    },
    longDescription:{
        type:String,
        minlength:200,
        maxlength:800
    },
    quantity:{
        type:Number
    },
    brandName:{
        type:String
    },
    size:{
        type:String,
        uppercase:true,
        enum:['S','M','L','XL','XXL','NA']
    },
  
    categoryName:{
        type:String,
        required:true
    },
    available: {
        type: Boolean,
        required: true,
      },

     createdAt:{
        type:Date,
        default:Date.now()
    },
    MerchantName:{
        type:String
    },
    MerchantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'merchantProfile'
    } 
    
})
//ObjectId=ObjectProductId;
module.exports=
{
    Product:mongoose.model("product",productSchema),
    ObjectProductId
}