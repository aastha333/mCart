const bodyparser=require('body-parser');
const {Product,ObjectProductId}=require('../model/product');
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const {Category,ObjectCategoryId}=require('../model/category');
const { Brand ,ObjectBrandId} = require('../model/brand');
//const {Brand,ObjectBrandId}=require('..model/brand');


const addProduct=async function(req,res){  
    try
    {   await merchantProfile.findById(req.merchant).then(async (data)=>{
        await Brand.findOne({_id:ObjectId(req.query.brandId),categoryId:req.query.categoryId}).then(()=>{
                if(data)
                {
                    //let name=data.firstName+" "+data.lastName;
                    let id=data._id;
                    //console.log(req.body.quantity,typeof req.body.quantity);
                    
                if(req.body.productName && req.body.baseCost && req.body.shortDescription&& req.body.longDescription )
                {   
                    // var baseCost=req.body.baseCost;
                    // var discount=req.body.discount;
                    // var discountedCost=baseCost-(baseCost*discount/100);
                    var quantity=req.body.quantity;
                    var available=avail(quantity);
                    
                    function avail(q){
                        if(q>0){
                            //console.log("1");
                            return true;
                        }
                        else{
                            //console.log("0");
                            return false;
                        }
                    }
        
                    var product=new Product({
                    productName:req.body.productName,
                    baseCost:req.body.baseCost,
                    discount:req.body.discount,
                    discountedCost:(req.body.baseCost-(req.body.discount*req.body.baseCost/100)),
                    shortDescription:req.body.shortDescription,
                    longDescription:req.body.longDescription,
                    quantity:quantity,
                   
                    category:req.query.categoryId,
                    //currency:req.body.currency,
                    brand:req.query.brandId,
                    size:req.body.size,
                    available:available,
                    createdAt:req.body.createdAt,
                    MerchantId:id
                })
                    product.save().then((data)=>{
                        console.log(product);
                       
                        res.status(200).send ({
                            "status": "true",
                            "msg": "Successfully Added",
                            "response": data,
                            "code":200,
                            "error": {
                            },
                        })
                    })
                
                }
            }
                
                else{
                    res.status(401).json({data:"Please Fill All Field and fill Correct Data!"});
                }
        })
        
    })
   
}
    catch(error){
        res.status(500).json(
        {
            "status": true,
            "response": null,
            "code": 200,
            "error": {
            "errCode": "FAILED",
            "errMsg": "Failed to ADD"
            },
        })
    }   
}



const updateProduct=async function(req,res){
    try
    {
     
        await Product.findOne({MerchantId:req.merchant},{_id:ObjectId(req.query.productId)},{"productName":1}).then(async (data)=>{
            if(data)
            {      
                data.productName=req.body.productName,
                data.baseCost=req.body.baseCost,
                //data.discountedCost=req.body.discountedCost,
                data.discount=req.body.discount,
                data.shortDescription=req.body.shortDescription,
                data.longDescription=req.body.longDescription,
                data.quantity=req.body.quantity,
                //data.categoryName=req.body.categoryName,
                //currency:req.body.currency,
                //data.brandName=req.body.brandName,
                data.size=req.body.size
                var available=avail(req.body.quantity);
                function avail(q){
                    if(q>0){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                data.available=available

                    await data.save().then((data)=>{
                        res.status(200).send ({
                            "status": "true",
                            "msg": "Successfully Updated",
                            "response": data,
                            "code":200,
                            "error": {
                            },
                        })
                        
                    });
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
const deleteProduct=async function(req,res){
    try
    {
        await Product.deleteOne({MerchantId:req.merchant},{_id:ObjectId(req.query.productId)}).then((result)=>{
            if(result)
            res.status(200).send ({
                "status": "true",
                "msg": "Successfully Updated",
                "response":result,
                "code":200,
                "error": {
                },
            })
            else
            res.json({result:'No Data Exist!'});
        })
    }
    catch(error){
        res.status(500).json(
            {
                "status": true,
                "response": null,
                "code": 200,
                "error": {
                "errCode": "FAILED",
                "errMsg": "Failed to Delete"
                },
            })
    }
}
module.exports={
       
        addProduct,
        updateProduct,
        deleteProduct,
        
    }