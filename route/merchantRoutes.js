const express=require('express');
const router=express.Router();
const {merchantProfile,ObjectId}=require('../model/merchantProfile');
const {Product,ObjectProductId}=require('../model/product');
const {customerProfile,ObjectCustomerId}=require('../model/customerProfile');
 const auth = require('../middleware/auth_admin');
 const Auth=require('../middleware/auth_merchant')
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();


const profile=require('../controller/merchantController');

router.get('/getMerchant',jsonEncoder,auth.JWT,profile.getMerchant)
router.post('/addProfile',jsonEncoder,auth.JWT,profile.addProfile);
router.post('/loginProfile',jsonEncoder,profile.loginProfile);
router.get('/getProfileById',jsonEncoder,Auth.JWT,profile.getProfile);
router.put('/updateProfile',jsonEncoder,Auth.JWT,profile.updateProfile );
router.delete('/deleteProfile',jsonEncoder,Auth.JWT,profile.deleteProfile );

//  router.post('/addCustomer',jsonEncoder,customer.addCustomer);
//  router.post('/loginCustomer',jsonEncoder,customer.loginCustomer);
//  router.post('/verifyCustomer',jsonEncoder,customer.verifyOtp);
//  router.post('/addAddress',jsonEncoder,customer.addAddress);
//  router.put('/updateCustomer',jsonEncoder,customer.updateCustomer);
//  router.put('/deleteAddress',jsonEncoder,customer.deleteAddress);
 //router.post('/addToCart',jsonEncoder,cart.addToCart);
// router.post('/addPayment',jsonEncoder,payment.addPayment);
// router.get('/getPayment',jsonEncoder,payment.getPayment);
// router.put('/updatePayment',jsonEncoder,payment.updatePayment);

module.exports=router;
