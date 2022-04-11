const mongoose=require("mongoose")
const { ObjectCategoryId }=mongoose.Types;

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    }
})

module.exports=
{
    Category:mongoose.model("Category",categorySchema),
    ObjectCategoryId
}