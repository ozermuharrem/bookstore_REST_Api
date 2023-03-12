const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const bookRoute = require('./router/bookRoute');
const authRoute = require('./router/authRoute');

const app = express();


// Mongodb connect 
mongoose.connect('mongodb+srv://muharremozer505:GMTKPdfpa5B9GnZZ@cluster0.ulqw79t.mongodb.net/bookstore?retryWrites=true&w=majority')
.then(()=>{
    console.log('DB Connected Successfully')
})
.catch((err)=>{
    console.log(err)
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/login', authRoute);
app.use('/books',bookRoute);


const port = 3000;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
})