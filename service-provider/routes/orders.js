const express = require('express');
const router = express.Router()

const { getAllOrders, getOrder, getCompletedOrders, getPendingOrders, acceptOrder, getAcceptedOrders, completeOrder } = require('../controllers/orders')
const authMiddleware = require('../middlewares/auth')


router.post('/accept-order/:id', authMiddleware, acceptOrder)
router.post('/complete/:id', authMiddleware, completeOrder)
router.get('/', authMiddleware, getAllOrders)
router.get('/completed-orders', authMiddleware, getCompletedOrders)
router.get('/pending-orders', authMiddleware, getPendingOrders);
router.get('/accepted', authMiddleware, getAcceptedOrders);
router.get('/:id', authMiddleware, getOrder);




module.exports = router