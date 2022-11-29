const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    books:{
        type: [String],
        ref: "Book"
    },
    roles: {
        User: {
            type: Number,
            default: 2
        },
        Editor: Number,
        Admin: Number

    },
    refreshToken: {
        type: String,
        default: ""
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);