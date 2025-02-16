require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const errorHandlerMiddleware = require('./middlewares/error-handler')
// const authenticationMiddleware = require('./middlewares/authentication');
const notFoundMiddleware = require('./middlewares/not-found');

const connectDB = require('./db/connect');

const customerAuthRouter = require('./customer/routes/auth');
const customerProductRouter = require('./customer/routes/products');
const customerOrderRouter = require('./customer/routes/orders');
const customerAuthMiddleware = require('./middlewares/auth');
const customerWalletRouter = require('./customer/routes/wallet');
// const profileRouter = require('./routes/profile');
// const attendanceRouter = require('./routes/attendance')

const sproviderAuthRouter = require('./service-provider/routes/auth')
const sproviderOrderRouter = require('./service-provider/routes/orders')
const sproviderWalletRouter = require('./service-provider/routes/wallet')
const catalogueRouter = require('./service-provider/routes/catalogue')

const port = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('Your server is live');
});

// middlewares 
app.use(express.json());

app.use('/api/v1/customer/auth', customerAuthRouter);

app.use('/api/v1/customer/product', customerAuthMiddleware, customerProductRouter);

app.use('/api/v1/customer/order', customerAuthMiddleware, customerOrderRouter);

app.use('/api/v1/customer/wallet', customerAuthMiddleware, customerWalletRouter);

app.use('/api/v1/sprovider/auth', sproviderAuthRouter);

app.use('/api/v1/sprovider/orders', sproviderOrderRouter);

app.use('/api/v1/sprovider/catalogue', catalogueRouter);

app.use('/api/v1/sprovider/wallet', sproviderWalletRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}


start();