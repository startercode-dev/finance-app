const express = require('express');
const { PlaidApi, Configuration, PlaidEnvironments } = require('plaid');
const { toTitleCase, removePrefix } = require('./utils/helpers');
const Item = require('./models/item.model');
const Transaction = require('./models/transaction.model');
const Account = require('./models/account.model');
const globalErrorController = require('./utils/error-handler');
const AppError = require('./utils/app-error');

const webhookApp = express();

// Body & Cookies parser, reading data from body into req.body
webhookApp.use(express.json());
webhookApp.use(express.json({ limit: '10kb' }));

const configuration = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
            'Plaid-Version': '2020-09-14',
        },
    },
});
const client = new PlaidApi(configuration);

const syncTransactions = async (itemId) => {
    const today = new Date();
    const startDate = new Date(new Date(today).setDate(today.getDate() - 30))
        .toISOString()
        .split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];
    const item = await Item.findOne({ itemId: itemId });
    const { accessToken, user } = item;

    const currTransactions = await Transaction.find({ user: user });
    const existingIds = currTransactions.map((t) => t.transactionId);

    const request = {
        access_token: accessToken,
        start_date: startDate, //note: need to be dynamic.
        end_date: endDate, //note: need to be dynamic.
        options: {
            include_personal_finance_category: true,
        },
    };

    try {
        const response = await client.transactionsGet(request);
        const { transactions } = response.data;
        // console.log(transactions);
        transactions.map(async (transaction) => {
            const account = await Account.findOne({
                accountId: transaction.account_id,
            });

            // format and combine Plaid Categories
            const { category } = transaction;
            const { primary } = transaction.personal_finance_category;
            const { detailed } = transaction.personal_finance_category;

            const formattedPrimary = toTitleCase(primary.split('_').join(' '));
            const formattedDetail = toTitleCase(
                removePrefix(detailed, primary),
            );
            const plaidCategories = Array.from(
                new Set([...category, formattedPrimary, formattedDetail]),
            );

            // Check if transaction already exist
            if (existingIds.indexOf(transaction.transaction_id) === -1) {
                await Transaction.create({
                    user: user,
                    account: account,
                    date: transaction.date,
                    authorizedDate: transaction.authorized_date,
                    merchantName: transaction.merchant_name,
                    merchantLogoUrl: transaction.logo_url,
                    transactionName: transaction.name,
                    amount: transaction.amount,
                    activeCategory: formattedPrimary,
                    category: plaidCategories,
                    plaidCategoryIconUrl:
                        transaction.personal_finance_category_icon_url,
                    transactionId: transaction.transaction_id,
                    pending: transaction.pending,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

//* HELPER FUNCTIONS *//
const handleTransactionsWebhook = async (code, requestBody) => {
    switch (code) {
        case 'INITIAL_UPDATE':
            console.log(
                `first update, there are ${requestBody.new_transactions} available`,
            );
            break;
        case 'HISTORICAL_UPDATE':
            console.log(
                `historical update, there are ${requestBody.new_transactions} available`,
            );
            break;
        case 'DEFAULT_UPDATE':
            console.log(
                `New data available: there are ${requestBody.new_transactions} available`,
            );
            // console.log(requestBody);
            await syncTransactions(requestBody.item_id);

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
                `please reconnect soon to avoid disruption - ${requestBody}`,
            );
            break;
        case 'USER_PERMISSION_REVOKED':
            console.log(
                `user revoked access to this item, can be remove from record - ${requestBody}`,
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
                `error generating this report: ${requestBody.error.error_message}`,
            );
            break;
        default:
            console.log(`can't handle webhook code ${code}`);
            break;
    }
};

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

// GLOBAL ERR HANDLER **
webhookApp.all('*', (req, res, next) => {
    next(new AppError('wrong link', 404));
});

webhookApp.use(globalErrorController);

module.exports = webhookApp;
