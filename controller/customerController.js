const bodyparser=require('body-parser');
const otpGenerator = require('otp-generator');
const bcrypt=require('bcrypt');
const  _ = require('lodash');
const axios=require('axios');
const {customerProfile,ObjectId}=require('../model/customerProfile');
//const {Address,ObjectAddressId}=require('../model/addressCustomer')
const {OTP,ObjectOtpId}=require('../model/otp');
const jwt = require('jsonwebtoken');

const getCustomer=async function(req,res){
    try
    {
        await customerProfile.find().then((result)=>{
            if(result)
                res.json(result);
            else
                res.json({result:"No Data Exist!"});
        })
    }
    catch(error)
    {
        res.status(401).json(error.message);
    }
    
}


const addCustomer=async function(req,res){  
    try
    {
        if(req.body.firstName && req.body.lastName &&req.body.gender&&req.body.DOB&& req.body.address&&req.body.email && req.body.mobileNo &&req.body.countryCode&& req.body.address && (req.body.mobileNo.toString().length)>=10 && (req.body.mobileNo.toString().length)<=10)
        
        {
            
            var data=new customerProfile({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            gender:req.body.gender,
            DOB:req.body.DOB,
            mobileNo:req.body.mobileNo,
            email:req.body.email,
            countryCode:req.body.countryCode,
            address:req.body.address
        })
            await data.save().then(()=>{
                responseObj = {
                    "status": "success",
                    "msg": "Record found.",
                    "body": data
                }
                res.status(200).send(responseObj)
            })
          
          
      
        }
        
        else{
            res.status(401).json({data:"Please Fill All Field and fill Correct Data!"});
        }
    }
    catch(error){
        res.status(500).json({data:error.message})
    }   
}
const addAddress= async function(req,res){
    try{
       
        await customerProfile.findOneAndUpdate({_id:ObjectId(req.query.id)},
            
            { $push: { address:req.body.address  } },
            ).then(data=>{
                responseObj = {
                    "status": "success",
                    "msg": "Record found.",
                    "body": data
                }
                res.status(200).send(responseObj)
            })
        
    }
    catch{
        res.send("error")
    }
}
const deleteAddress=async function(req,res){
    try{
       await customerProfile.updateOne({_id:ObjectId(req.query.Id)},{$pull: {address:{_id:ObjectId(req.query.id)} }}, 
    {multi: true}).then(data=>{
        responseObj = {
            "status": "success",
            "msg": "Record found.",
            "body": data
        }
        res.status(200).send(responseObj)
    })
    }catch{
        res.send("Error");
    }
}
const updateAddress=async function(req,res){
    try{
        await customerProfile.findOneAndUpdate({_id:ObjectId(req.query.Id)},{'address._id':ObjectId(req.query.addressId)},
         { $set: {'address.$': req.body.address}})
    }
    catch{
        res.send(err);
    }
}
const loginCustomer=async function(req,res){
   try{
        await customerProfile.findOne({mobileNo:req.body.mobileNo}).then(async(data)=>{
            if(data){
            const Otp=otpGenerator.generate(6,{
                digits:true,alphabets:false,upperCase:false,specialChars:false
            });
            const number=req.body.mobileNo;
            res.json(Otp);
            const otp=new OTP({
                number:number,
                Otp:Otp
            });
            //console.log(number);
            var salt=await bcrypt.genSalt(10);
            otp.Otp=await bcrypt.hash(otp.Otp,salt);
            //console.log("blabla")
            await otp.save().then(data=>{
                res.status(200).send({
                    msg:"OTP send successfully",
                    data:data
                });
            });
        }
    else{
        res.json("Customer doesn't exist");
        }
    })

   }
    catch{
            console.log("Error")
    }
}
const verifyOtp= (req,res)=>
    {
        customerProfile.findOne({mobileNo:req.body.number}).then(value=>{
        OTP.find({ number:req.body.number})
        .exec()
        .then(data=>
            {   
                if(data.length<1)
                {
                    return res.status(401).json({
                        message: "OTP Expired"
                    })
                }
                else{
                    var privateKey="csfrdtfynumj447678uyueewfghjk";
                    bcrypt.compare(req.body.otp,data[0].Otp,(err,result)=>{
                        if(!result){
                            res.status(401).json({
                                message:"otp wrong"
                            })
                        }
                        if(result)
                        {
                            const token =jwt.sign({
                                //name:data[0].name,
                                number:data[0].number,
                            },
                            privateKey,
                            {
                                expiresIn:"24h"
                            }
                            );
                            res.status(200).send ({
                                "status": "true",
                                "msg": "Successfully login",
                                "response": value,
                                "code":200,
                                "error": {
                                },
                                token:token
                            })
                        }
                    })
                }
            })
        })
            .catch(err=>
                {
                    res.status(500).json(
                        {
                            "status": true,
                            "response": null,
                            "code": 200,
                            "error": {
                            "errCode": "FAILED",
                            "errMsg": "Failed to login"
                            },
                        })
                })
    }
        


const getCustomerById=async function(req,res){
    try
    {
        await customerProfile.findOne({_id:ObjectId(req.query.id)}).then((data)=>{
            if(data)
                res.json(data);
            else
                res.json({data:'No Data Exist!'});
        })
    }
    
    catch(err){
        res.status(401).json({data:err.message});
    }
}


const updateCustomer=async function(req,res){
    try
    {
        await customerProfile.findOne({_id:ObjectId(req.query.id)}).then(async (data)=>{
            if(data)
            {
                if(!req.body.email)
                {
                    data.firstName=req.body.firstName;
                    data.lastName=req.body.lastName;
                    data.gender=req.body.gender;
                    data.DOB=req.body.DOB;
                    data.mobileNo=req.body.mobileNo;
                    //data.address=req.body.address;

                    await data.save().then((data)=>{
                        res.json(data);
                        
                    });
                }
                else
                    res.json({data:"Can't edit email"});
                
            }    
            else
                res.json({data:"No Data Exist!"});    
        })
        
    }
    catch(error)
    {
        res.status(401).json({data:error.message});
    }
}
const deleteCustomer=async function(req,res){
    try
    {
        await customerProfile.deleteOne({_id:ObjectId(req.query.id)}).then((result)=>{
            if(result)
                res.json(result);
            else
            res.json({result:'No Data Exist!'});
        })
    }
    catch(error){
        res.status(401).json({data:error.message});
    }
}
module.exports={
        addCustomer,
        getCustomerById,
        loginCustomer,
        updateCustomer,
        deleteCustomer,
        verifyOtp,
        addAddress,
        deleteAddress,
        updateAddress,
        getCustomer
    }