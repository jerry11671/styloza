const { StatusCodes } = require('http-status-codes')
const Product = require('../../models/Products')


const createProduct = async (req, res) => {
    const { name, price, image, description } = req.body;
    const product = await Product.create({ name, price, image, description });
    res.status(StatusCodes.CREATED).json({ status: true, msg: 'Product created' })
}





module.exports = { createProduct }
