require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const errorHandlerMiddleware = require('./middlewares/error-handler')
// const authenticationMiddleware = require('./middlewares/authentication');
const notFoundMiddleware = require('./middlewares/not-found');

const connectDB = require('./db/connect');

const customerAuthRouter = require('./customer/routes/auth');
// const profileRouter = require('./routes/profile');
// const attendanceRouter = require('./routes/attendance')

const sproviderAuthRouter = require('./service-provider/routes/auth')
const sproviderOrderRouter = require('./service-provider/routes/orders')
const sproviderWalletRouter = require('./service-provider/routes/wallet')
const catalogueRouter = require('./service-provider/routes/catalogue')

const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Styloza',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
   components: {
     securitySchemes: {
         bearerAuth: {
             type: 'http',
             scheme: 'bearer',
             bearerFormat: 'JWT', 
         },
     },
 },
    },
    apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// routes
app.get('/', (req, res) => {
    res.send('Your server is live');
});

// middlewares 
app.use(express.json());

app.use('/api/v1/customer/auth', customerAuthRouter);

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