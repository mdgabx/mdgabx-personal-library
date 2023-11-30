/*
*
*
*       Complete the API routing below
*       
*       
*/
const { BookModel } = require('../model')

'use strict';

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      try {

        const allBooks = await BookModel.find({}, '_id title comments')

        if (!allBooks) {
          return res.send('no books exist');
        }

        const booksWithComments = allBooks.map((book) => {
          return {
            _id: book._id,
            title: book.title,
            comments: book.comments,
            commentcount: book.comments.length
          }
        })

        res.json(booksWithComments)

      } catch (err) {
        res.status(500).json({ error: `Server error: ${err}`  })
      }

    })
    
    .post(async (req, res) => {
      let title = req.body.title;
      // Response will contain a new book object including at least _id and title

      try {
    
        if (!title) {
          return res.send('missing required field title');
        } else {
          const newBook = await BookModel.create({ title: title })

          res.json(newBook);
        }
      } catch (err) {
        return res.status(500).json({ error: 'Server error' });
      }
    })
    
    .delete(async(req, res) => {
      //if successful response will be 'complete delete successful'

      try { 

        await BookModel.deleteMany({})

        res.send('complete delete successful')

      } catch (err) {
        res.status(500).json(`Server error: ${err}`)
      }

    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      try {

        const book = await BookModel.findById(bookid, '_id title comments')

        if(!book) {
          return res.send('no book exists')
        }

        res.json(book)

      } catch (err) {
        res.status(500).json({ error: `Server error: ${err}` })
      }

    })
    
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if(!comment) {
        return res.send('missing required field comment')
      }

      try {
        const book = await BookModel.findById(bookid);
    
        if (!book) {
          return res.send('no book exists');
        }
    
        book.comments.push(comment);
    
        await book.save(); 
    
        const updatedBook = await BookModel.findById(bookid);
    
        res.json(updatedBook);
      } catch (err) {
        res.status(500).json(`Server Error: ${err}`);
      }

    })
    
    .delete(async (req, res) => {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'

      try {
        const book = await BookModel.findByIdAndDelete(bookid)

        if(!book){
          return res.send('no book exists')
        }

        res.json('delete successful')

      } catch (err) {
        res.status(500).json(`Server error: ${err}`)
      }

    });
  
};
