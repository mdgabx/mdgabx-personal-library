const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: { type: String }
})

const BookModel = mongoose.model("BookModel", BookSchema)

module.exports = { BookModel }