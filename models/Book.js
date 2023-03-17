const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//book Schema
const bookSchema = new Schema({
    title : {
        type : String,
        required : true,
        maxlength : 255
    },
    description : {
        type : String,
        required : true,
        maxlength : 2000
    },
    author : {
        type : String,
        required : true,
        maxlength : 255
    },
    year : {
        type : Number,
        required : true,
        min : 0,
        max : new Date().getFullYear()
    },
    cover : {
        type : String,
        maxlength : 1000,
        validate: {
          validator: function(value) {
            return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value);
          },
          message: 'Enter a valid url address...'
        }
    }
    
})

const Book = mongoose.model('book',bookSchema);

module.exports = Book;
