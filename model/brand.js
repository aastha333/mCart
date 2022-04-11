const mongoose=require("mongoose")
const { ObjectBrandId }=mongoose.Types;

const brandSchema = new mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    brandName:{
        type:String,
        required:true
    }
})

module.exports=
{
    Brand:mongoose.model("Brand",brandSchema),
    ObjectBrandId
}