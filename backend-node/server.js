require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const connectDb = require('./config/connectDb');
const verifyJwt = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

//Connecting to the Database
connectDb();

//handling credentials check 
app.use(credentials);

//CROSS ORIGIN REASOURCE SHARING
app.use(cors(corsOptions));

//built in middleware to handle urlencoded data which is basically form data
app.use(express.urlencoded({extended: false}));

//built in middleware to handle json
app.use(express.json());

//middleware to pare cookies
app.use(cookieParser());

//user registration
app.use('/register', require('./routes/register'));

//user authentification and logout
app.use('/login', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));

//user refresh access token
app.use('/refresh', require('./routes/refresh'));

//Search route
app.use('/search', require('./routes/search'));

// //Secure all routes with jwt verification
// app.use(verifyJwt);

//book api route
app.use('/books', require('./routes/api/books'));
app.use('/borrow',require('./routes/api/borrow'));
app.use('/users',require('./routes/api/user'));
app.use('/authors', require('./routes/api/author'));
app.use('/categories', require('./routes/api/category'));


//Listenning to verify connection to database
mongoose.connection.once('open',() => {
    console.log('Connected to mongoDb');
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
});