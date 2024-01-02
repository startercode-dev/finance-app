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

exports.getTransactions = async (req, res, next) => {
    // console.log(req.body.access_token);
    const request = {
        access_token: req.body.access_token,
        start_date: '2022-01-21',
        end_date: '2023-02-01',
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

        res.status(200).json({
            message: 'New transactions added',
        });
    } catch (err) {
        // handle error
        console.log(err);
    }
};
