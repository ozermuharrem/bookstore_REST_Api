const Book = require('../Models/Book');

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