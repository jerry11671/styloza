const Wallet = require('../../models/Wallet')
const {NotFoundError} = require('../../errors')

const createWallet = async (req, res, next) => {
    try {
        const {id: userId} = req.user;

        if (!id) {
            throw new NotFoundError('No user for this request')
        }

        const wallet = await Wallet.create({userId: userId});

        next();
    } catch (error) {
        console.log(error)
    }
}





module.exports = createWallet