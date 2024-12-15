const Catalogue = require('../../models/Catalogue');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../../errors')



const addCatalogueProduct = async (req, res) => {
    const {id:designerId} = req.user;
    req.body.designerId = designerId;
    const catalogue = await Catalogue.create(req.body)
    return res.status(StatusCodes.CREATED).json({status: true, catalogue})
}


const getCatalogue = async (req, res) => {
    const {id: designerId} = req.user;
    const catalogue  = await Catalogue.find({designerId: designerId})
    return res.status(StatusCodes.OK).json({status: true, catalogue})
}






module.exports = {addCatalogueProduct, getCatalogue};