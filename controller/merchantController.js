const bodyparser=require('body-parser');
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getMerchant=async(req,res)=>{
    await merchantProfile.find().then((data)=>{
        if(data){
            res.json(data)
        }
        else{
            res.json("No merchant is present.Please add merchant!")
        }
    })
}
const addProfile = async(req,res)=>
{
//var salt = bcrypt.genSaltSync(10);
bcrypt.hash(req.body.password,10,(err,hash)=>
{
    if(err)
    {
        return res.status(500).json({
            error:err
        })
    }
        else
        {
            const profile = new merchantProfile({
                firstName :req.body.firstName,
                lastName :req.body.lastName,
                gender:req.body.gender,
                DOB:req.body.DOB,
                mobileNo:req.body.mobileNo,
                countryCode:req.body.countryCode,
                role:req.body.role,
                email:req.body.email,
                address:req.body.address,
               
                password :hash
                })
                profile.save()
                .then(result=>{
                    res.status(200).send ({
                        "status": "true",
                        "msg": "Successfully Authorized",
                        "response": result,
                        "code":200,
                        "error": {
                        },
                    })
                 })
                 .catch(err=>{
                    res.status(500).send(
                        {
                            "status": true,
                            "response": null,
                            "code": 200,
                            "error": {
                            "errCode": "AUTHORIZE_FAILED",
                            "errMsg": "Failed to Authorize"
                            },
                        })
                 })
        }
        })
    }
    const loginProfile= (req,res)=>
    {
        merchantProfile.find({ email:req.body.email})
        .exec()
        .then(data=>
            {
                if(data.length<1)
                {
                    return res.status(401).json({
                        message: "merchant not found"
                    })
                }
                else{
                    var privateKey="csfrdtfynumj447678uyueewfeacdsz";
                    bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
                        if(!result){
                            res.status(401).json({
                                message:"password matching fail"
                            })
                        }
                        if(result)
                        {
                            const token =jwt.sign({
                                //name:data[0].name,
                                //email:data[0].email,
                                id:data[0]._id
                            },
                            privateKey,
                            {
                                expiresIn:"24h"
                            }
                            );
                            res.status(200).send ({
                                "status": "true",
                                "msg": "Successfully login",
                                "response": data,
                                "code":200,
                                "error": {
                                },
                                token:token
                            })
                        }
                    })
                }
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
// const verify = (req, res, next) =>{ 
//     try{
//         const token = req.headers.authorization.split(" ")[1];
//         console.log(token);
//         const decoded = jwt.verify(token, process.env.JWT_KEY)
//         req.userData = decoded;
//         next();
//     }
//     catch(error){
//         return res.status(401).json({
//             message: "Auth failed"
//         });
//     }
// };
const getProfile=async function(req,res){
    try
    {
        await merchantProfile.findById(req.merchant).then((data)=>{
            if(data)
            //console.log(data);
                res.json(data);
            else
                res.json({data:'No Data Exist!'});
        })
    }
    
    catch(err){
        res.status(500).json(
            {
                "status": true,
                "response": null,
                "code": 200,
                "error": {
                "errCode": "SESSION EXPIRED",
                "errMsg": "Failed to fetch"
                },
            })
    }
}

const updateProfile=async function(req,res){
    try
    {
        await merchantProfile.findById(req.merchant).then(async (data)=>{
            if(data)
            {
                if(!req.body.email)
                {
                    data.firstName=req.body.firstName;
                    data.lastName=req.body.lastName;
                    data.mobileNo=req.body.mobileNo;
                    data.address=req.body.address;
                    data.DOB=req.body.DOB;
                    data.gender=req.body.gender;
                    
                    

                    await data.save().then((data)=>{
                        res.status(200).send ({
                            "status": "true",
                            "msg": "Successfully login",
                            "response": data,
                            "code":200,
                            "error": {
                            },
                        })
                        
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
        res.status(500).json(
            {
                "status": true,
                "response": null,
                "code": 200,
                "error": {
                "errCode": "FAILED",
                "errMsg": "Failed to Update"
                },
            })
    }
}
const deleteProfile=async function(req,res){
    try
    {
        await merchantProfile.findByIdAndDelete(req.merchant).then((result)=>{
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
        addProfile,
        loginProfile,
        getProfile,
        updateProfile,
        deleteProfile,
        getMerchant
    }