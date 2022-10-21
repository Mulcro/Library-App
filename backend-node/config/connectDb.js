const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    }
    catch(err){
        console.error(err);
    }
}

module.exports = connectDb