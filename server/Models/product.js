const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    Name: { type: String },
        Price: { type: Number },
        Desc: { type: String },
        Category: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
