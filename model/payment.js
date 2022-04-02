const mongoose=require("mongoose")
const { ObjectPaymentId }=mongoose.Types;

const paymentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    cardNo:{
        type:Number,
        required:true,
        unique:true
    },
    cardName:{
        type:String,
        required:true,
        enum:['MASTERCARD','VISA']
    },
    cardHolderName:{
        type:String,
        required:true
    },
    CVV:{
        type:Number,
        required:true,
        unique:true,
        // min:3,
        // max:4
        // validate(value){if(value.toString()){
        //     throw new Error("Enter a valid Roll no")}}
    },
    expiryDate:{
        type:Date,
        min:Date.now,
        required:true
    },
    paymentid:{
        type:String
    }
})

module.exports=
{
    Payment:mongoose.model("Payment",paymentSchema),
    ObjectPaymentId
}