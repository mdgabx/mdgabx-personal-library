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
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(async (req, res) => {
      let title = req.body.title;
      // Response will contain a new book object including at least _id and title

      try {
    
        if (!title) {
          return res.send('missing required field title');
        } else {
          const newBook = await BookModel.create({ title: title })

          res.status(201).json(newBook);
        }
      } catch (err) {
        return res.status(500).json({ error: 'Server error' });
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
