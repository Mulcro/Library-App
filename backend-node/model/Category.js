const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {type: String, required: true}
});

module.exports = mongoose.model('Category', categorySchema);
