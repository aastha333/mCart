const express=require('express');
const router=express.Router();
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const {Product,ObjectProductId}=require('../model/product');
const {customerProfile,ObjectCustomerId}=require('../model/customerProfile');
//const {Address,ObjectAddressId}=require('../model/addressCustomer')
const auth = require("../middleware/auth_customer");
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();

//const product=require('../controller/productController');
//const profile=require('../controller/merchantController');
const inventory=require('../controller/inventoryController');
const customer=require('../controller/customerController');


router.post('/addCustomer',jsonEncoder,customer.addCustomer);
 router.post('/loginCustomer',jsonEncoder,customer.loginCustomer);
 router.post('/verifyOtp',jsonEncoder,customer.verifyOtp);
 router.put('/addAddress',jsonEncoder,auth.JWT,customer.addAddress);
 router.put('/updateAddress',jsonEncoder,auth.JWT,customer.updateAddress);
 router.put('/updateCustomer',jsonEncoder,auth.JWT,customer.updateCustomer);
 router.put('/deleteAddress',jsonEncoder,auth.JWT,customer.deleteAddress);
 router.get('/getCustomerById',jsonEncoder,auth.JWT,customer.getCustomerById);
 router.delete('/deleteCustomer',jsonEncoder,auth.JWT,customer.deleteCustomer);
 router.get('/getCustomer',jsonEncoder,customer.getCustomer);
 router.get('/showProductToCustomer',jsonEncoder,auth.JWT,inventory.showProductToCustomer);
 router.get('/show',jsonEncoder,auth.JWT,inventory.show);




module.exports=router;