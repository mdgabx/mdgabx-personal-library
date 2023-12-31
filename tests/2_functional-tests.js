/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  }).timeout(10000)
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
            .post('/api/books')
            .send({ title: 'Harry Potter' })
            .end(function (err, res) {
              assert.equal(res.status, 200)
              assert.equal(res.body.title, "Harry Potter")

              done();
            })
      }).timeout(10000)
      
      test('Test POST /api/books with no title given', function(done) {
          chai.request(server)
              .post('/api/books')
              .send({ title: "" })
              .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.title, undefined)

                done()
              })
      
      }).timeout(10000)
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
            .get('/api/books')
            .end(function(err, res) {
              assert.equal(res.status, 200)
              assert.isArray(res.body, "Test if there is data")

              done();
            })


      }).timeout(10000)      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        const sampleId = "1234"

        chai.request(server)
            .get(`/api/book/${sampleId}`)
            .end(function (err, res) {
              assert.equal(res.status, 404)
              assert.isEmpty(res.body, "Should not have any data")

              done();
            })


      }).timeout(10000)
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        const sampleId = "65688f17236ffbf4037d6ec9"
        
        chai.request(server)
            .get(`/api/books/${sampleId}`)
            .end(function(err, res) {
              assert.equal(res.status, 200)

              if(res.body.length > 0) {
                assert.property(res.body[0], "title")
                assert.property(res.body[0], "comments")
              }

              done();
            })

      }).timeout(10000)
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        const sampleId = "6569d825c7e3998ac253bb15"
        const sampleComment = "dummy comment"

        chai.request(server)
            .post(`/api/books/${sampleId}`)
            .send({ comment: sampleComment })
            .end(function(err, res) {
              assert.equal(res.status, 200)
              assert.isObject(res.body, "Response should be an object");
              
              done();
            })

      }).timeout(10000)

      test('Test POST /api/books/[id] without comment field', function(done){
        const sampleId = "6569d825c7e3998ac253bb15"
        const sampleComment = ""

        chai.request(server)
            .post(`/api/books/${sampleId}`)
            .send({ comment: sampleComment })
            .end(function(err, res) {
              assert.equal(res.status, 200)
              assert.equal(res.text, 'missing required field comment')

              done();
            })

      }).timeout(10000)

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
          const sampleId = "1451"
          const sampleComment = "comment for an id which is not on db"
          
          chai.request(server)
              .post(`/api/books/${sampleId}`)
              .send({ comment: sampleComment })
              .end(function (err, res) {
                assert.equal(res.status, 500)
                assert.notProperty(res.body, "title")

                done();
              })

      }).timeout(10000)
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        const sampleId = "656b26b14fc91d419c7c040b"
        
        chai.request(server)
            .delete(`/api/books/${sampleId}`)
            .end(function(err, res) {
              assert.equal(res.status, 200)
              assert.notEqual(res.text, '')

              done();
            })
      }).timeout(10000)

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        const sampleId = "156113"

        chai.request(server)
            .delete(`/api/books/${sampleId}`)
            .end(function(err, res) {
              assert.equal(res.status, 500)
              assert.notProperty(res.body, "title")

              done();
            })

      }).timeout(10000)

    });

  });

});
