const Order = require('../../models/Order');
const { StatusCodes } = require('http-status-codes');



const placeOrder = async (req, res) => {
    const { id: customerId } = req.user;
    const { designer, product, quantity, isCustomized, isExactly } = req.body;

    const order = await Order.create({ customer: customerId, product, quantity })
    res.status(StatusCodes.CREATED).json({status: true, msg: 'Order has been placed'});
}




module.exports = { placeOrder };