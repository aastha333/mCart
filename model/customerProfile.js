const mongoose=require("mongoose");
//const {Address,ObjectAddressId}=require('../model/addressCustomer')
const { ObjectId }=mongoose.Types;


const customerProfileSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    lastName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    gender:{
        type:String,
        enum:['Male','Female','Transgender','Not prefer to say'],
        required:true
    },
    DOB:{
        type:Date,
        min:'01-01-1967',
        max:Date.now
    },
    mobileNo:{
        type:Number,
        required:true,
        unique:true,
        match:[/^[6789]\d{9}$/,"Please enter a valid mobile no"]
    },
    CountryCode:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        
        // validate(value){if(value.toString()){
        //     throw new Error("Enter a valid Roll no")}}
    },
   address:[{
    
        type : {
            type: String,
            required:true,
            enum:['Home','Work','Others']
        },
        primary : {
            type: Boolean
        },
        street : {
            type: String,
            required:true
        },
        locality : {
            type: String
        },
        city : {
            type: String,
            required:true
        },
        district : {
            type: String,
            required:true
        },
        state : {
            type: String,
            required:true
        },
        pinCode : {
            type:Number,
            minlength:6,
            maxlength:6,
            min:100000,
            max:900000
    }

   }]
   
    // token:{
    //     type:String
    // }
})

module.exports=
{
    customerProfile:mongoose.model("customerProfile",customerProfileSchema),
    ObjectId
}