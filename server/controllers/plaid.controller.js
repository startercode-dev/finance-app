const Item = require('../models/item.model');
const Account = require('../models/account.model');
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
        res.status(404).json(error);
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
            status: 'success',
            newItem,
        });
    } catch (error) {
        res.status(404).json({
            status: 'error',
            error,
        });
    }
};

exports.getAccounts = async (req, res, next) => {
    const items = await Item.find({ user: req.user._id });
    const accessTokens = items.map((item) => item.accessToken);

    const currAccounts = await Account.find({ user: req.user._id });
    const existingAccounts = currAccounts.map((t) => t.accountId);

    const request = {
        access_token: accessTokens[0],
    };

    try {
        const response = await client.accountsGet(request);
        const accounts = response.data.accounts;

        await Promise.all(
            accounts.map(async (account) => {
                if (existingAccounts.indexOf(account.account_id) === -1) {
                    await Account.create({
                        user: req.user,
                        accountId: account.account_id,
                        accountName: account.name,
                        accountOfficialName: account.official_name,
                        availableBalance: account.balances.available,
                        currentBalance: account.balances.current,
                        subtype: account.subtype,
                    });
                }
            })
        );

        res.status(201).json({
            status: 'success',
            message: 'new account added',
        });
    } catch (error) {
        res.status(404).json(error);
    }
};

exports.getTransactions = async (req, res, next) => {
    const items = await Item.find({ user: req.user._id });
    const accessTokens = items.map((item) => item.accessToken);
    // console.log(accessTokens);

    const currTransactions = await Transaction.find({ user: req.user._id });
    const existingIds = currTransactions.map((t) => t.transactionId);
    // console.log(existing_ids.length);

    const request = {
        access_token: accessTokens[0],
        start_date: '2022-01-01', //note: need to be dynamic.
        end_date: '2024-02-01', //note: need to be dynamic.
        options: {
            include_personal_finance_category: true,
        },
    };
    try {
        const response = await client.transactionsGet(request);
        // console.log(response.data.total_transactions);
        let transactions = response.data.transactions;
        const total_transactions = response.data.total_transactions;

        while (transactions.length < total_transactions) {
            const paginatedRequest = {
                access_token: accessTokens[0],
                start_date: '2022-01-01',
                end_date: '2024-02-01',
                options: {
                    offset: transactions.length,
                    include_personal_finance_category: true,
                },
            };
            const paginatedResponse = await client.transactionsGet(
                paginatedRequest
            );
            transactions = transactions.concat(
                paginatedResponse.data.transactions
            );
        }

        await Promise.all(
            transactions.map(async (transaction) => {
                const account = await Account.findOne({
                    accountId: transaction.account_id,
                });
                if (existingIds.indexOf(transaction.transaction_id) === -1) {
                    await Transaction.create({
                        user: req.user,
                        account: account,
                        date: transaction.date,
                        authorizedDate: transaction.authorized_date,
                        merchantName: transaction.merchant_name,
                        transactionName: transaction.name,
                        amount: transaction.amount,
                        activeCategory:
                            transaction.personal_finance_category.primary,
                        category: transaction.category,
                        personalCategory: transaction.personal_finance_category,
                        transactionId: transaction.transaction_id,
                        pending: transaction.pending,
                    });
                }
            })
        );

        res.status(201).json({
            status: 'success',
            message: 'New transactions added',
        });
    } catch (err) {
        // handle error
        res.status(404).json(err);
    }
};
