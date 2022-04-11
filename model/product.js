const mongoose=require("mongoose")
const { ObjectProductId } = mongoose.Types;
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const {Category,ObjectCategoryId} =require('../model/category')

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
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand'
    },
    categoryId:{
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
    Product:mongoose.model("product",productSchema),
    ObjectProductId
}