const mongoose = require('mongoose');

const PromosSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a promo name'],
        maxlength: [200, 'Promo name can not be more than 200 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    references: {
        type: [String],
        required: [true, 'Please add a reference to a main photo'],
        validate: [arrayLimit, 'Exceeds the limit of references']
    },
    description: {
        type: String,
        select: false,
        maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    createAt: {
        type: Date,
        select: false,
        default: Date.now
    }
});

function arrayLimit(val) {
    return val.length <= 3;
}


module.exports = mongoose.model('Promos', PromosSchema);