const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log(err.name, '|', err.message);
    process.exit(1);
});

let DB;
if (process.env.NODE_ENV) {
    dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
    DB = process.env.DATABASE.replace(
        '<password>',
        process.env.DATABASE_PASSWORD,
    );
} else {
    dotenv.config({ path: `./.env.local` });
    DB = process.env.DATABASE_LOCAL;
}

const app = require('./app');
const webhookApp = require('./webhookApp');

mongoose.set('strictQuery', true);
const connectDB = async () => {
    try {
        mongoose.connect(DB, {
            useNewUrlParser: true,
        });
        console.log('Connected to DB');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const port = process.env.PORT;
const server = connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Running at port ${port} ...`);
    });
});

const webhookPort = process.env.WEBHOOK_PORT;
webhookApp.listen(webhookPort, () => {
    console.log(`webhook server is running at port ${webhookPort}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, '|', err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down.');
    server.close(() => {
        console.log('Process terminated.');
    });
});
