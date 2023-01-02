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
    email: {
        type:String
    },
    profilePic: {
        type: String,
        default: "https://inspireddentalcare.co.uk/wp-content/uploads/2016/05/Facebook-default-no-profile-pic-273x300.jpg"
    },
    books:{
        type: [String],
        ref: "Book"
    },
    roles: {
        User: {
            type: Number,
            //Change the default number
            default: 20
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