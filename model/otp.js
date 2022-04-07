const mongoose=require("mongoose")
const { ObjectOtpId }=mongoose.Types;

const OTPSchema = new mongoose.Schema({
    number:{
        type:Number,
        required:true,
        match:[/^[6789]\d{9}$/,"Please enter a valid mobile no"]
    },
    Otp:{
        type:String,
        required:true
    },
    createdAt:{type:Date,default:Date.now,index:{expires:300}}
},
{timestamps:true})

module.exports=
{
    OTP:mongoose.model("OTP",OTPSchema),
    ObjectOtpId
}