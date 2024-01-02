const Item = require('../models/item.model');
const catchAsync = require('../utils/catch-async');
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
        products: ['auth', 'transactions'],
        language: 'en',
        redirect_uri: 'http://localhost:8000/',
        country_codes: ['US'],
    };

    try {
        const createTokenResponse = await client.linkTokenCreate(request);
        // console.log(createTokenResponse.data);
        res.status(200).json(createTokenResponse.data);

        //note: Continue with the token.
        //note: Adjust the catchAsync error handling, include the field "data", response from plaid was not being logged.
    } catch (error) {
        console.log(error);
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
