const mongoose=require("mongoose")
const { ObjectPaymentId }=mongoose.Types;

const paymentSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
      ref: "customerProfile",
    },
    name:{
        type:String,
        required:true
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
        required:true,
        uppercase:true
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
    paymentId:{
        type:String
    }
})

module.exports=
{
    Payment:mongoose.model("Payment",paymentSchema),
    ObjectPaymentId
}