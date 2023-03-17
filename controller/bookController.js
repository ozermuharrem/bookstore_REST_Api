const Book = require('../models/Book');

// get all books

exports.getAllBooks = async (req,res, next) => {
    try {
        const books = await Book.find();

        res.status(200).json({
            message : "All Books",
            books
        })
    } catch (error) {
        res.status(400).jdon({
            messsage : "Fail",
            error
        })        
    }
}

// create book

exports.createBook = async (req,res,next) => {
    try {
        const book = await Book.create(req.body);

        res.status(201).json({
            message : "creation successful",
            book
        })
    } catch (error) {
        res.status(400).json({
            message : "creation is incorrect",
            error
        })
    }
}

//Retrieve a specific book

exports.retrieveBook = async (req,res,next) => {
    try {
       const specificBook = await Book.findById(req.params.id);
    
       if(!specificBook)
            throw "invalid id or no data with this id";


       res.status(200).json({
        message : "retrieveBook",
        specificBook
       })
    } catch (error) {
        res.status(400).json({
            message : "Retrieve Book Fail",
            error
        })
    }
}

//Update Book

exports.updateBook = async (req,res,next) => {
    try {
        const currentYear = new Date;
        
        function isURL(str) {
            // URL regular expression
            const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
            return pattern.test(str);
        }

        if(typeof req.body.year != Number && (req.body.year < 0 || req.body.year > currentYear.getFullYear()))
             throw "year must be a positive integer between 0 and the current year";
        if(req.body.title){
                if(req.body.title.length > 255)
                    throw "titles can be up to 255 characters long";
         }
        if(req.body.author){
            if(req.body.author.length > 255)
                throw "authors can be up to 255 characters long";
        }
        if(req.body.description){
            if(req.body.description.length > 2000)
                throw "descriptions can be up to 2000 characters long";
        }
        if(req.body.cover){
            if(!isURL(req.body.cover))
               throw "please enter a valid url address";
        }

        
        
        await Book.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            message : `update book id: ${req.params.id}`
        })
    } catch (error) {
        res.status(400).json({
            message : `update book fail id: ${req.params.id}`,
            error
        })
        console.log(error);
    }
}

// Delete Book 

exports.deleteBook = async (req, res,next) => {
    try{

        await Book.findOneAndRemove({ _id :req.params.id});
        
        res.status(200).json({
        message : `deleting book id: ${req.params.id}`
        })
    }catch(error){
        res.status(400).json({
            message : `deleting book fail id: ${req.params.id}`,
            error
        })
    }
}
