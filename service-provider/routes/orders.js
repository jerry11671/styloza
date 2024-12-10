const express = require('express');
const router = express.Router()

const {getAllOrders, getOrder, getCompletedOrders, getPendingOrders, acceptOrder} = require('../controllers/orders')
const authMiddleware = require('../middlewares/auth')


router.post('/accept-order/:id', authMiddleware, acceptOrder)
router.get('/', authMiddleware, getAllOrders)
router.get('/completed-orders', authMiddleware, getCompletedOrders)
router.get('/pending-orders', authMiddleware, getPendingOrders)
router.get('/:id', authMiddleware, getOrder)




module.exports = router