const express=require('express');
const router=express.Router();
const {Product,ObjectProductId}=require('../model/product');
const {customerProfile,ObjectCustomerId}=require('../model/customerProfile');
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();
const {Order,ObjectOrderId}=require('../model/order');
const auth=require('../middleware/auth_customer')

const order=require('../controller/orderController');
const cart=require('../controller/cartController');
const payment=require('../controller/paymentController')

router.post('/addPayment',jsonEncoder,auth.JWT,payment.addPayment);
router.get('/getPayment',jsonEncoder,auth.JWT,payment.getPayment);
router.put('/updatePayment',jsonEncoder,auth.JWT,payment.updatePayment);
router.delete('/deletePayment',jsonEncoder,auth.JWT,payment.deletePayment);
router.put('/makePayment',jsonEncoder,auth.JWT,payment.makePayment);

router.post('/addToCart',jsonEncoder,auth.JWT,cart.addToCart);
router.put('/deleteFromCart',jsonEncoder,auth.JWT,cart.deleteFromCart);
//router.put('/updateQuantity',jsonEncoder,cart.updateQuantity);
router.put('/getCart',jsonEncoder,auth.JWT,cart.getCart);
router.delete('/emptyCart',jsonEncoder,auth.JWT,cart.emptyCart)

router.post('/orderProduct',jsonEncoder,auth.JWT,order.orderProduct);
router.put('/updateOrderStatus',jsonEncoder,auth.JWT,order.updateOrderStatus);
router.put('/cancelOrder',jsonEncoder,auth.JWT,order.cancelOrder);
router.put('/cancelOneProduct',jsonEncoder,order.cancelOneProduct)
router.get('/getCart',jsonEncoder,auth.JWT,order.getCart)
module.exports=router;