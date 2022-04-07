const express=require('express');
const router=express.Router();
const {Product,ObjectProductId}=require('../model/product');
const {customerProfile,ObjectCustomerId}=require('../model/customerProfile');
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();
const {Order,ObjectOrderId}=require('../model/order');
const order=require('../controller/orderController');

router.post('/orderProduct',jsonEncoder,order.orderProduct);
router.put('/updateOrderStatus',jsonEncoder,order.updateOrderStatus);
router.put('/cancelOrder',jsonEncoder,order.cancelOrder)
router.get('/getCart',jsonEncoder,order.getCart)
module.exports=router;