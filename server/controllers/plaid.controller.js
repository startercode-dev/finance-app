const {
    PlaidApi,
    Configuration,
    PlaidEnvironments,
    WebhookType,
    SandboxItemFireWebhookRequestWebhookCodeEnum,
} = require('plaid');
const Item = require('../models/item.model');
const Account = require('../models/account.model');
const Transaction = require('../models/transaction.model');
const { toTitleCase, removePrefix } = require('../utils/helpers');

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

const webhookUrl =
    process.env.WEBHOOK_URL || 'https://www.example.com/server/plaid_webhook';

// console.log(webhookUrl);

exports.fireWebhook = async (req, res, next) => {
    const items = await Item.find({ user: req.user._id });
    const accessTokens = items[0].accessToken;

    // console.log(accessTokens);

    try {
        const fireWebhookRes = await client.sandboxItemFireWebhook({
            access_token: accessTokens,
            webhook_code: 'DEFAULT_UPDATE',
        });
        console.log(fireWebhookRes.data);
        res.status(200).json(fireWebhookRes.data);
    } catch (error) {
        console.log(error);
    }
};

exports.updateWebhook = async (req, res, next) => {
    const items = await Item.find({ user: req.user._id });
    const accessTokens = items[0].accessToken;
    const url = req.body.newUrl;

    try {
        const updateWebhookRes = await client.itemWebhookUpdate({
            access_token: accessTokens,
            webhook: url,
        });

        res.status(200).json(updateWebhookRes.data);
    } catch (error) {
        console.log(error);
    }
};

//* GET PLAID LINK TOKEN
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
        country_codes: ['US'],
        webhook: webhookUrl,
    };

    try {
        const createTokenResponse = await client.linkTokenCreate(request);
        // console.log(createTokenResponse);
        res.status(200).json(createTokenResponse.data);

        //note: Adjust the catchAsync error handling for plaid APIs
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
};

//* GET ACCESS TOKEN FROM PLAID
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

//* GET ACCOUNTS FOR NEW PLAID ITEMS
exports.getAccounts = async (req, res, next) => {
    // const items = await Item.find({ user: req.user._id });
    const items = await Item.find({ user: req.user._id })
        .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (newest first)
        .limit(1);
    const accessTokens = items[0].accessToken;
    // console.log(items);

    const currAccounts = await Account.find({ user: req.user._id });
    const existingAccounts = currAccounts.map((t) => t.accountId);

    const request = {
        access_token: accessTokens,
    };

    try {
        const response = await client.accountsGet(request);
        const { accounts } = response.data;

        await Promise.all(
            accounts.map(async (account) => {
                if (existingAccounts.indexOf(account.account_id) === -1) {
                    await Account.create({
                        user: req.user,
                        item: items[0],
                        accountId: account.account_id,
                        accountName: account.name,
                        accountOfficialName: account.official_name,
                        availableBalance: account.balances.available,
                        currentBalance: account.balances.current,
                        subtype: account.subtype,
                    });
                }
            }),
        );

        res.status(201).json({
            status: 'success',
            message: 'new account added',
        });
    } catch (error) {
        res.status(404).json(error);
    }
};

//* GET TRANSACTIONS
exports.getTransactions = async (req, res, next) => {
    const items = await Item.find({ user: req.user._id });
    const accessTokens = items.map((item) => item.accessToken);
    // console.log(accessTokens);

    const currTransactions = await Transaction.find({ user: req.user._id });
    const existingIds = currTransactions.map((t) => t.transactionId);
    // console.log(existing_ids.length);

    //* CREATE AND ARRAY OF PROMISES FROM ALL THE ACCESS TOKENS
    const promises = accessTokens.map(async (accessToken) => {
        const request = {
            access_token: accessToken,
            start_date: req.body.startDate, //note: need to be dynamic.
            end_date: req.body.endDate, //note: need to be dynamic.
            options: {
                include_personal_finance_category: true,
            },
        };
        try {
            const response = await client.transactionsGet(request);
            let transaction = response.data.transactions;
            const { total_transactions } = response.data;
            // console.log(transactions.length);

            // PAGINATED REQUEST TO GET ALL AVAILABLE TRANSACTIONS
            while (transaction.length < total_transactions) {
                const paginatedRequest = {
                    access_token: accessToken,
                    start_date: req.body.startDate,
                    end_date: req.body.endDate,
                    options: {
                        offset: transaction.length,
                        include_personal_finance_category: true,
                    },
                };
                const paginatedResponse =
                    await client.transactionsGet(paginatedRequest);
                transaction = transaction.concat(
                    paginatedResponse.data.transactions,
                );
                // console.log(transactions.length);
            }

            // RETURN THE DATA
            return transaction;
        } catch (err) {
            console.log(err);
        }
    });

    try {
        const transactions = await Promise.all(promises);
        const allTransactions = [].concat(...transactions);
        // console.log(allTransactions[1]);

        // SAVE TO DB
        await Promise.all(
            allTransactions.map(async (transaction) => {
                const account = await Account.findOne({
                    accountId: transaction.account_id,
                });

                // format and combine Plaid Categories
                const { category } = transaction;
                const { primary } = transaction.personal_finance_category;
                const { detailed } = transaction.personal_finance_category;

                const formattedPrimary = toTitleCase(
                    primary.split('_').join(' '),
                );
                const formattedDetail = toTitleCase(
                    removePrefix(detailed, primary),
                );
                const plaidCategories = Array.from(
                    new Set([...category, formattedPrimary, formattedDetail]),
                );

                // Check if transaction already exist
                if (existingIds.indexOf(transaction.transaction_id) === -1) {
                    await Transaction.create({
                        user: req.user,
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
            }),
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
