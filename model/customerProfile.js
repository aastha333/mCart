const mongoose=require("mongoose");
//const {Address,ObjectAddressId}=require('../model/addressCustomer')
const { ObjectId }=mongoose.Types;


const customerProfileSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20,
        match:[/^[a-z .'-]+$/i,"Enter valid first name"]
    },
    lastName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20,
        match:[/^[a-z .'-]+$/i,"Enter valid last name"]
    },
    gender:{
        type:String,
        enum:['Male','Female','Transgender','male','female','transgender','Not prefer to say'],
        required:true
    },
    DOB:{
        type:Date,
        min:Date.now()-100,
        max:Date.now()-18
    },
    mobileNo:{
        type:Number,
        required:true,
        unique:true,
        match:[/^[6-9][0-9]{9}$/,"Please enter a valid mobile no"]
    },
    countryCode:{
        type:String,
        match: [/^(\+?\d{1,3}|\d{1,4})$/gm,"Please enter a valid country code"]
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