const Order = require('../../models/Order')
const {StatusCodes} = require('http-status-codes');
const Product = require('../../models/Products');
const NotFoundError = require('../../errors')



const getAllOrders = async (req, res) => {
    const orders = await Order.find({}).sort('-createdAt')
    return res.status(StatusCodes.OK).json({status: true, orders: orders})
}


// Gets all the orders from several clients 
const getOrder = async (req, res) => {
    const {id:orderId} = req.params
    const order = await Order.find({_id: orderId}).populate('product')
    return res.status(StatusCodes.OK).json({status: true, order: order})
}


// Gets the completed orders
const getCompletedOrders = async (req, res) => {
    const completedOrders = await Order.find({completed: true}).select('-completed')
    return res.status(StatusCodes.OK).json({success: true, completedOrders})
}


// Get the pending orders
const getPendingOrders = async (req, res) => {
    const pendingOrders = await Order.find({completed: false}).select('-completed')
    return res.status(StatusCodes.OK).json({success: true, pendingOrders})
}


// Accept the order from a client 
const acceptOrder = async (req, res) => {
    const {id:orderId} = req.params
    const {id: designerId} = req.user
    const newOrder = await Order.findByIdAndUpdate({_id: orderId}, {designer: designerId})
    return res.status(StatusCodes.OK).json({success: true})
}






module.exports = {getAllOrders, getOrder, getCompletedOrders, getPendingOrders, acceptOrder}