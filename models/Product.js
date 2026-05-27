const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default || require('passport-local-mongoose');


const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('Product', productSchema);