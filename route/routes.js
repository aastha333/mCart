const express=require('express');
const router=express.Router();
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const {Product,ObjectProductId}=require('../model/product');
const {customerProfile,ObjectCustomerId}=require('../model/customerProfile');
const auth = require("../middleware/auth_merchant");
const Auth = require("../middleware/auth_customer");
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();

const product=require('../controller/productController');
const profile=require('../controller/merchantController');
const inventory=require('../controller/inventoryController');
const customer=require('../controller/customerController');
// const payment=require('../controller/paymentController')

router.get('/getAllProduct',jsonEncoder,auth.JWT,inventory.getProduct);
router.get('/getProduct',jsonEncoder,auth.JWT,inventory.getProduct);
router.post('/addProduct',jsonEncoder,auth.JWT,product.addProduct);
router.get('/getProductByID',jsonEncoder,auth.JWT,inventory.getProductByID);
router.put('/updateProduct',jsonEncoder,auth.JWT,product.updateProduct);
router.delete('/deleteProduct',jsonEncoder,auth.JWT,product.deleteProduct);
router.get('/getProductByMerchant',jsonEncoder,auth.JWT,inventory.getProduct);


router.post('/addProfile',jsonEncoder,profile.addProfile);
router.post('/loginProfile',jsonEncoder,profile.loginProfile);
router.get('/getProfile',jsonEncoder,profile.getProfile);
router.put('/updateProfile',jsonEncoder,auth.JWT,profile.updateProfile );
router.delete('/deleteProfile',jsonEncoder,auth.JWT,profile.deleteProfile );

 router.post('/addCustomer',jsonEncoder,customer.addCustomer);
 router.post('/loginCustomer',jsonEncoder,customer.loginCustomer);
 router.post('/verifyCustomer',jsonEncoder,customer.verifyOtp);
 router.post('/addAddress',jsonEncoder,customer.addAddress);
 router.put('/updateCustomer',jsonEncoder,customer.updateCustomer);
 router.put('/deleteAddress',jsonEncoder,customer.deleteAddress);

// router.post('/addPayment',jsonEncoder,payment.addPayment);
// router.get('/getPayment',jsonEncoder,payment.getPayment);
// router.put('/updatePayment',jsonEncoder,payment.updatePayment);

module.exports=router;
