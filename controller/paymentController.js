const bodyparser=require('body-parser');
const {customerProfile,ObjectId}=require('../model/customerProfile');
const {Payment,ObjectPaymentId} =require('../model/payment');
var crypto = require("crypto");
const { Order } = require('../model/order');

const getPayment=async function(req,res){
    try
    {
        await Payment.findOne({customerId:req.customer}).then((result)=>{
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

const addPayment=async function(req,res){
    try{
        await customerProfile.findOne({_id:ObjectId(req.customer)}).then(async (data)=>
       {
           if(data)
           {
            let name=data.firstName+" "+data.lastName;
            let customerId=data._id;
            
            let paymentId = crypto.randomBytes(6).toString('hex');
            //console.log(paymentId)
            if(req.body.cardNo && req.body.cardName && req.body.cardHolderName && req.body.CVV && req.body.expiryDate && (req.body.cardNo.toString().length)>=16 && (req.body.cardNo.toString().length)<=16 && req.body.CVV.toString().length>=3 && req.body.CVV.toString().length <=3)
            {  
                var cardNo=req.body.cardNo;
                var cardName=req.body.cardName;
                var cardHolderName=req.body.cardHolderName;
                var CVV=req.body.CVV;
                var expiryDate=req.body.expiryDate;
                let payment=new Payment({
                    
                    name:name,
                    customerId:customerId,
                    cardNo:cardNo,
                    cardName:cardName,
                    cardHolderName:cardHolderName,
                    CVV:CVV,
                    expiryDate:expiryDate,
                    paymentId:paymentId
                })
                //console.log(name);
                await payment.save().then((data)=>{
                    res.end(data);
                })
            }
            else
                res.json({data:'Enter correct data'});
           }
           else
            res.status(401).json(error.message);
       })
    }

catch(error){
    res.status(401).json(error.message);
}
}   

const updatePayment=async function(req,res){
    try
    {
        await Payment.findOne({paymentId:(req.query.paymentId)},{cardNo:1,"cardName":1,"cardHolderName":1,"CVV":1,"expiryDate":1,"paymentid":1}).then(async (data)=>{
            //console.log(data);
            if(data)
            {
                if(req.body.cardNo&& req.body.cardName && req.body.cardHolderName && req.body.CVV && req.body.expiryDate && (req.body.cardNo.toString().length)>=16 && (req.body.cardNo.toString().length)<=16 && (req.body.CVV.toString().length)>=3 &&(req.body.CVV.toString().length)<=3)
                {
                    data.cardNo=req.body.cardNo,
                    data.cardName=req.body.cardName,
                    data.cardHolderName=req.body.cardHolderName,
                    data.CVV=req.body.CVV,
                    data.expiryDate=req.body.expiryDate
                    await data.save().then((data)=>{
                        res.json(data);
                    })
                }
                else
                    res.json({data:'Enter correct data'});
            }
            else
                res.json({data:'Payment History Does not exist!'});
        })
    }
    catch(err)
    {
        res.status(401).json({data:err.message});
    }
}
const deletePayment=async(req,res)=>{
   
        try
        {
            await Payment.deleteOne({paymentId:(req.query.paymentId)}).then((result)=>{
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
const makePayment=async(req,res)=>{
    try{
        await Order.findOne({_id:ObjectId(req.query.orderId)}).then(async(data)=>{
            //console.log(data);
            if(data&&data.status=='Payment Incomplete'){
                await Payment.findOne({paymentId:req.query.paymentId},{customerId:req.customer}).then((result)=>{
                    if(result){ 
                     let transactionid = crypto.randomBytes(6).toString('hex');
                     data.transactionId=transactionid;
                     data.status='Ordered'
                     data.save().then((data)=>{
                         res.send(
                             {response:"Payment successful",
                             data:data})
                         //res.json(out)
                     })
                    }
                    else{
                        res.json("Please enter vaild Payment ID")
                    }
                  
                })
            }
            else{
                res.json('Order is not Placed')
            }
        })
    }
    catch(err){
        res.json(err)
    }
}
const refundPayment=async(req,res)=>{
    try{
        await Order.findOne({_id:req.query.orderId}).then((data)=>{
            if(data&&data.status=='Cancelled'){
                data.status='Refund Proceeding'
                data.save().then((data)=>{
                    //res.json('')
                })
            }
        })

    }
    catch(err){
        res.json(err)
    }
}

    module.exports={
        addPayment,
        getPayment,
        updatePayment,
        deletePayment,
        makePayment,
        refundPayment
    }