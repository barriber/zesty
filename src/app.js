const express = require('express');
const routes = require('./routes');
const etl = require('./etl');

const app = express();
etl.writeEc2Instances();
app.use(express.json());

app.use('/api/v1', routes);

const port = 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const unexpectedErrorHandler = (error) => {
    console.log('ERROR', error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
