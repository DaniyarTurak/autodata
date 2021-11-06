const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');


//Load env vars
dotenv.config({ path: './config/config.env' });

//Load models
const Promos = require('./models/Promos');

//Connect to Db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
});

//READ Json files
const promos = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/promos.json`, 'utf-8')
);

//Import into Db
const importData = async () => {
    try {
        await Promos.create(promos);
        console.log('Data imported...'.green.inverse);
        process.exit();

    } catch(err) {
        console.log(err);
    }
}

//Delete data
const deleteData = async () => {
    try {
        await Promos.deleteMany();

        console.log('Data destroyed...'.red.inverse);
        process.exit();

    } catch(err) {
        console.log(err);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}