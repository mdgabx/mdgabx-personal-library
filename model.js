const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comments: [String]
})

const BookModel = mongoose.model("BookModel", BookSchema)

module.exports = { BookModel }