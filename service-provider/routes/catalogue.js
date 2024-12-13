const express = require('express');
const router = express.Router();

const {addCatalogueProduct, getCatalogue} = require('../controllers/catalogue');
const authMiddleware = require('../middlewares/auth')


router.post('/add-product', authMiddleware, addCatalogueProduct);
router.get('/', authMiddleware, getCatalogue);





module.exports = router