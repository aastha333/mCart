// const express=require("express")
// const app=express();

// // Require `PhoneNumberFormat`. 
// var PNF = require('google-libphonenumber').PhoneNumberFormat;

// // Get an instance of `PhoneNumberUtil`. 
// var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

// // Parse number with country code. 
// var phoneNumber = phoneUtil.parse('7417694455', 'IN');

// // Print number in the international format. 
// console.log(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));


const express=require('express');
const app=express();
const mongoose=require('mongoose');
const merchantRoutes=require('./route/merchantRoutes');
const customerRoutes=require('./route/customerRoutes');
const _=require('lodash');
const otpGenerator=require('otp-generator');
const axios=require('axios');
require("dotenv").config();
//let db=process.env.DB;
mongoose.connect("mongodb+srv://Aastha:mqtkSMVqNXuijFDa@cluster0.9kzsa.mongodb.net/mCart?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Mongo Connected!');
})

let port= process.env.PORT||5000;
//let host= process.env.HOST;

//app.set('view engine','ejs');

app.use('/mCart',merchantRoutes);
//app.use('/mCart',customerRoutes)


// app.get('/cool',function(req,res){
//     res.render('index.ejs');
// })

app.listen(port,()=>{
    console.log(`We are listening to server on port ${port}`)
})