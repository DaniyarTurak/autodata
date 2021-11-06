const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');  
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const connectDb = require('./config/db'); 


// Load env val
dotenv.config({ path: './config/config.env' });

connectDb();

// Route files
const promos = require('./routes/promos');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/promos', promos);

app.use(errorHandler);


const PORT = process.env.PORT;

const server = app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow.bold)
);

//Handle unhandled rejection of promises
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    server.close(() => process.exit(1));
});