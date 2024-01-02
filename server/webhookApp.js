const express = require('express');
const plaidRouter = require('./routes/plaid.routes');
const globalErrorController = require('./utils/error-handler');
const AppError = require('./utils/app-error');

const webhookApp = express();

// Body & Cookies parser, reading data from body into req.body
webhookApp.use(express.json());
webhookApp.use(express.json({ limit: '10kb' }));

//* SERVER-SIDE ROUTES //

webhookApp.post('/server/receive_webhook', async (req, res) => {
    try {
        // console.log('wsup from lil webhook\n', req.body);
        const product = req.body.webhook_type;
        const code = req.body.webhook_code;

        switch (product) {
            case 'ITEM':
                handleItemWebhook(code, req.body);
                break;
            case 'TRANSACTIONS':
                handleTransactionsWebhook(code, req.body);
                break;
            case 'ASSETS':
                handleAssetsWebhook(code, req.body);
                break;
            default:
                console.log(`can't handle webhook product: ${product}`);
                break;
        }

        res.status(200).json({ status: 'webhook received' });
    } catch (error) {
        console.log(error);
    }
});

//* HELPER FUNCTIONS *//
const handleTransactionsWebhook = (code, requestBody) => {
    switch (code) {
        case 'INITIAL_UPDATE':
            console.log(
                `first update, there are ${requestBody.new_transactions} available`
            );
            break;
        case 'HISTORICAL_UPDATE':
            console.log(
                `historical update, there are ${requestBody.new_transactions} available`
            );
            break;
        case 'DEFAULT_UPDATE':
            console.log(
                `New data available, there are ${requestBody.new_transactions} available`
            );
            break;
        case 'TRANSACTIONS_REMOVED':
            console.log(`there are transactions that was removed`);
            break;
        default:
            console.log(`can't handle webhook code ${code}`);
            break;
    }
};

const handleItemWebhook = (code, requestBody) => {
    switch (code) {
        case 'ERROR':
            console.log(`error, reconnect. *${requestBody.error}`);
            break;
        case 'NEW_ACCOUNTS_AVAILABLE':
            console.log(`There are new accounts available - ${requestBody}`);
            break;
        case 'PENDING_EXPIRATION':
            console.log(
                `please reconnect soon to avoid disruption - ${requestBody}`
            );
            break;
        case 'USER_PERMISSION_REVOKED':
            console.log(
                `user revoked access to this item, can be remove from record - ${requestBody}`
            );
            break;
        case 'WEBHOOK_UPDATE_ACKNOWLEDGED':
            console.log('new webhook updated');
            break;
        default:
            console.log(`can't handle webhook code ${code}`);
            break;
    }
};

const handleAssetsWebhook = (code, requestBody) => {
    switch (code) {
        case 'PRODUCT_READY':
            console.log('asset report is ready to download');
            break;
        case 'ERROR':
            console.log(
                `error generating this report: ${requestBody.error.error_message}`
            );
            break;
        default:
            console.log(`can't handle webhook code ${code}`);
            break;
    }
};

// GLOBAL ERR HANDLER **
webhookApp.all('*', (req, res, next) => {
    next(new AppError('wrong link', 404));
});

webhookApp.use(globalErrorController);

module.exports = webhookApp;
