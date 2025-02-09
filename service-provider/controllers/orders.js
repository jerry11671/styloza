const Order = require('../../models/Order')
const { StatusCodes } = require('http-status-codes');
// const Product = require('../../models/Products');
const NotFoundError = require('../../errors')



const getAllOrders = async (req, res) => {
    const orders = await Order.find({}).sort('-createdAt').populate({
        path: 'product',
        select: 'name price image description'
    });
    return res.status(StatusCodes.OK).json({ status: true, orders: orders })
}

const getAcceptedOrders = async (req, res) => {
    const acceptedOrders = await Order.find({ isAccepted: true }).populate('product').sort('-createdAt');
    res.status(StatusCodes.OK).json({ status: true, acceptedOrders });
}


// Gets all the orders from several clients 
const getOrder = async (req, res) => {
    const { id: orderId } = req.params
    const order = await Order.find({ _id: orderId }).populate({
        path: 'product',
        select: 'name price image description'
    });
    return res.status(StatusCodes.OK).json({ status: true, order: order })
}


// Gets the completed orders
const getCompletedOrders = async (req, res) => {
    const completedOrders = await Order.find({ isAccepted: true, isCompleted: true }).populate({
        path: 'product',
        select: 'name price image description'
    }).select('-completed');
    return res.status(StatusCodes.OK).json({ success: true, completedOrders })
}


// Get the pending ordersm
const getPendingOrders = async (req, res) => {
    const pendingOrders = await Order.find({ isCompleted: false }).populate({
        path: 'product',
        select: 'name price image description'
    }).select('-completed');
    return res.status(StatusCodes.OK).json({ success: true, pendingOrders })
}


// Accept the order from a client 
const acceptOrder = async (req, res) => {
    const { id: orderId } = req.params
    const { id: designerId } = req.user
    const newOrder = await Order.findByIdAndUpdate({ _id: orderId }, { designer: designerId, isAccepted: true });
    return res.status(StatusCodes.OK).json({ success: true })
}

const completeOrder = async (req, res) => {
    const { id: orderId } = req.params
    const newOrder = await Order.findByIdAndUpdate({ _id: orderId }, { isCompleted: true }).populate('product');
    return res.status(StatusCodes.OK).json({ success: true })
}






module.exports = { getAllOrders, getOrder, getCompletedOrders, getPendingOrders, acceptOrder, getAcceptedOrders, completeOrder };