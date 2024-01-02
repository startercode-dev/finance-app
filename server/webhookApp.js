const express = require('express');
const plaidRouter = require('./routes/plaid.routes');
const globalErrorController = require('./utils/error-handler');
const AppError = require('./utils/app-error');

const webhookApp = express();

// Body & Cookies parser, reading data from body into req.body
webhookApp.use(express.json());
webhookApp.use(express.json({ limit: '10kb' }));

// SERVER-SIDE ROUTES **
webhookApp.post('/server/receive_webhook', async (req, res, next) => {
    try {
        console.log('wsup lil webhook nigs');
        res.status(200).json({ status: 'webhook received' });
    } catch (error) {
        console.log(error);
    }
});

// GLOBAL ERR HANDLER **
webhookApp.all('*', (req, res, next) => {
    next(new AppError('wrong link', 404));
});

webhookApp.use(globalErrorController);

module.exports = webhookApp;
