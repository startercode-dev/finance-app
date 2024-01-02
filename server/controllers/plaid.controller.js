const Item = require('../models/item.model');
const Transaction = require('../models/transaction.model');
const { PlaidApi, Configuration, PlaidEnvironments } = require('plaid');

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

exports.getLinkToken = async (req, res, next) => {
    const clientUserId = req.user.id;
    const request = {
        user: {
            // This should correspond to a unique id for the current user.
            client_user_id: clientUserId,
        },
        client_name: 'Macro',
        products: ['transactions'],
        language: 'en',
        redirect_uri: 'http://localhost:8000/',
        country_codes: ['US'],
    };

    try {
        const createTokenResponse = await client.linkTokenCreate(request);
        // console.log(createTokenResponse.data);
        res.status(200).json(createTokenResponse.data);

        //note: Adjust the catchAsync error handling for plaid APIs
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

exports.getAccessToken = async (req, res, next) => {
    const publicToken = req.body.public_token;

    try {
        const tokenResponse = await client.itemPublicTokenExchange({
            public_token: publicToken,
        });

        const newItem = await Item.create({
            user: req.user,
            accessToken: tokenResponse.data.access_token,
            itemId: tokenResponse.data.item_id,
        });

        res.status(200).json({
            newItem,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getTransactions = async (req, res, next) => {
    // console.log(req.body.access_token);
    const items = await Item.find({ user: req.user._id });
    const accessTokens = items.map((item) => item.accessToken);
    // console.log(accessTokens);

    const request = {
        access_token: accessTokens[0],
        start_date: '2022-01-21', //note: need to be dynamic.
        end_date: '2023-02-01', //note: need to be dynamic.
        options: {
            include_personal_finance_category: true,
        },
    };
    try {
        const response = await client.transactionsGet(request);

        let transactions = response.data.transactions;
        // console.log(response.data.transactions);

        await Promise.all(
            transactions.map(async (transaction) => {
                await Transaction.create({
                    user: req.user,
                    accountId: transaction.account_id,
                    date: transaction.date,
                    authorizedDate: transaction.authorized_date,
                    merchantName: transaction.merchant_name,
                    transactionName: transaction.name,
                    amount: transaction.amount,
                    category: transaction.category,
                    personalCategory: transaction.personal_finance_category,
                    transactionId: transaction.transaction_id,
                    pending: transaction.pending,
                });
                // console.log('added');
            })
        );

        res.status(201).json({
            status: 'success',
            message: 'New transactions added',
        });
    } catch (err) {
        // handle error
        console.log(err);
    }
};
