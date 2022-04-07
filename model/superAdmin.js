const mongoose=require("mongoose")
const { ObjectAdminId }=mongoose.Types;

// const Roles=Object.freeze({

// });
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    // role:{
    //     type:String,
    //     enum:Object.values(Roles),
    // },
    token:{
        type:String
    }
    
})
// Object.assign(adminSchema.statics,{
//     Roles,
// })
module.exports=
{
    Admin:mongoose.model("Admin",adminSchema),
    ObjectAdminId
}