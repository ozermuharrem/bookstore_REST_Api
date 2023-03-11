const Book = require('../Models/Book');

// get all books

exports.getAllBooks = async (req,res) => {
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
exports.createBook = async (req,res) => {
    try {
        const book = await Book.create(req.body);

        res.status(201).json({
            status : "creation successful",
            book
        })
    } catch (error) {
        res.status(400).json({
            status : "creation is incorrect",
            error
        })
    }
}

//Retrieve a specific book by ID

exports.retrieveBook = async (req,res) => {
    try {
       const specificBook = await Book.findById(req.params.id);
       
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

exports.updateBook = async (req,res) => {
    try {
        const updateBook = await Book.findOne({_id : req.params.id})

        // console.log(req.body.year );

        const cariYil = new Date
         console.log(typeof req.body.year);
    
        if(req.body.year < 0 && req.body.year > cariYil.getFullYear() && typeof req.body.year != Number){
             throw((err) => {
                 err
             });
         }else
            await Book.findByIdAndUpdate(req.params.id, req.body);
        
        res.status(200).json({
            message : `update book id: ${req.params.id}`
        })
    } catch (error) {
        res.status(400).json({
            message : `update book fail id: ${req.params.id}`,
            error
        })
    }
}