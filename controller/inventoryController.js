const bodyparser=require('body-parser');
const {Product,ObjectProductId}=require('../model/product');
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const {Category,ObjectCategoryId}=require('../model/category');
const asyncWrapper=require('../middleware/async');
const { createCustomError } = require('../error/customError')

const getAllProduct=async function(req,res){
    try
    {   let perPage = 3
        let page = Number(req.query.page) || 1
        if(page>1){
            next=page+1
            previous=page-1
        }
        else{
            next=page+1
            previous="null"
        }
        await Product.find()
        .populate('brand')
        .populate('category')
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((result)=>{
            if(result.length>0)
            res.status(200).send ({
                "status": "true",
                "msg": "Record found.",
                "response": result,
                "code":200,
                "error": {
                },
                current: page,
                next:next,
                previous:previous
            })
            else
                res.json({result:"No Data Exist!"});
        })
    }
    catch(error)
    {
        res.status(401).json(error.message);
    }
    
}

 const getProduct = function(req,res){   
   try{
    let perPage = 3
    let page = Number(req.query.page) || 1
    if(page>1){
        next=page+1
        previous=page-1
    }
    else{
        next=page+1
        previous="null"
    }
    
    let query={};
    if(req.query.search){
        query.$or=[
            { "productName" : { $regex: req.query.search, $options: 'i' } },
            { "brand" : { $regex: req.query.search, $options: 'i' } },
            { "category" : { $regex: req.query.search, $options: 'i' } },
            { "shortDescription" : { $regex: req.query.search, $options: 'i' } },
            { "longDescription" : { $regex: req.query.search, $options: 'i' } },
        ];
    }
    
    Product
        .find(query)
        .populate('brand')
        .populate('category')
        .sort({[req.query.key]:req.query.value})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, docs)  {
                res.status(200).send ({
                    "status": "true",
                    "msg": "Record found.",
                    "response": docs,
                    "code":200,
                    "error": {
                    },
                    //"msg": "Successfully authorized",
                    current: page,
                    next:next,
                    previous:previous
                    
                })
            })
    } catch(error){
        res.send("Not found")
    }
 }

    const getProductByID=async function(req,res){
        try{
        // {   let perPage = 3
        //     let page = Number(req.query.page) || 1
        //     if(page>1){
        //         next=page+1
        //         previous=page-1
        //     }
        //     else{
        //         next=page+1
        //         previous="null"
        //     }
            
          await Product.find({_id:ObjectId(req.query.productId)})
          .populate('brand')
          .populate('category')
          
            // .skip((perPage * page) - perPage)
            // .limit(perPage)
            .then((data)=>{
                if(data)
                    res.send({
                        "status": "true",
                        "msg": "Record found.",
                        "response": data,
                        "code":200,
                        "error": {
                        },
                        // current: page,
                        // next:next,
                        // previous:previous
                    })
                else
                    res.json({data:'No Data Exist!'});
            })
        }
        
        catch(err){
            res.status(401).json({data:err.message});
        }
    }
    const getProductByMerchant=async function(req,res){
      try
      {   
        // let perPage = 3
        // let page = Number(req.query.page) || 1
        // if(page>1){
        //     next=page+1
        //     previous=page-1
        // }
        // else{
        //     next=page+1
        //     previous="null"
        // }
        
          await Product.find({MerchantId:req.merchant})
          .populate('brand')
        .populate('category')
          
            // .skip((perPage * page) - perPage)
            // .limit(perPage)
            .then((data)=>{
              if(data)
                res.send({
                    "status": "true",
                    "msg": "Record found.",
                    "response": data,
                    "code":200,
                    "error": {
                    },
                    // current: page,
                    // next:next,
                    // previous:previous
                })
              else
                  res.json({data:'No Data Exist!'});
          })
      }
      
      catch(err){
          res.status(401).json({data:err.message});
      }
    }
const showProductToCustomer=asyncWrapper(async(req,res)=>{
    const product=await Product.find();
    let perPage = 3
        let page = Number(req.query.page) || 1
        if(page>1){
            next=page+1
            previous=page-1
        }
        else{
            next=page+1
            previous="null"
        }
        let query={};
        if(req.query.search){
            query.$or=[
                { "productName" : { $regex: req.query.search, $options: 'i' } },
                { "brand" : { $regex: req.query.search, $options: 'i' } },
                { "category" : { $regex: req.query.search, $options: 'i' } },
                { "shortDescription" : { $regex: req.query.search, $options: 'i' } },
                { "longDescription" : { $regex: req.query.search, $options: 'i' } },
            ];
        }
    await Product.find(query)
    .select({"productName":1,"shortDescription":1,"longDescription":1,"baseCost":1,"discount":1,"discountedCost":1,"brand":1,"_id":0})
    .populate({
        path:'brand',
        select:{"brandName":1,"_id":0}
    })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(async(data)=>{
        if(data){
            res.status(200).send ({
                "status": "true",
                "msg": "Record found.",
                "response": data,
                "code":200,
                "error": {
                },
                current: page,
                next:next,
                previous:previous
            })
        }
        else{
            return next(createCustomError(`No product is available to show `, 404))
        }
    })
})
module.exports={
        getProductByMerchant,
        getProductByID,
        getProduct,
        getAllProduct,
        showProductToCustomer
}