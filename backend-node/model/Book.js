const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref: "Author",
        required: true
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref:"Category", 
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
},
{timestamps: true}
);

module.exports = mongoose.model('Book', bookSchema);