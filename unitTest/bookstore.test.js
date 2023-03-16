const assert = require('assert');
const request = require('request');

// API url
const apiUrl = 'http://localhost:3000';
let token;
let user = {email: "test1@gmail.com" , password : "ps123456" }

describe("bookstore api test".toUpperCase(), ()=>{
    let id;

    console.log("⚠️  \033[1;91mYour server must be up for this test to run. Please make sure the server is up\033[0m");
     // API Login Request Test
    it("\033[1;94mLogin Request Test\033[0m", (done)=>{
        request.post(apiUrl+ '/user/login', {json : user}, function(err,res,body){
            
            token = body.token;
            assert.equal(res.statusCode,200);
            assert.equal(body.message, "Token is generated. This token is valid for 15 minutes. Login again after 15 minutes");
            done();
        })
    })


      // get all books test
    it('\033[1;94mGet All Books Test\033[0m', function(done) {
        request.get({
          url: apiUrl + '/books',
        }, function(error, response, body) {
          assert.equal(response.statusCode, 200);
          done();
        });
      });

          // create books test wtih token
    it('\033[1;94mCreate Book Test With Token\033[0m', function(done) {
        const testBook = { title : "test Book", description : "test description", author : "test author", year : 2023, cover : "http://test.com"}
        request.post({
          url: apiUrl + '/books', 
          json : testBook,
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }, function(error, response, body) {
            id = response.body.book._id;
          assert.equal(response.statusCode, 201);
          done();
        });
      });

        // retrivrBook test with token
    it('\033[1;94mRetrieve Book Test\033[0m', function(done){
        request.get({
            url : apiUrl + "/books/"+ id,
            headers: {
                'Authorization': 'Bearer ' + token
              }
            },function(error,response,body){
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        // update book test with token
    it('\033[1;94mUpdate Book Test With Token And ID\033[0m', function(done){
        request.put({
            url : apiUrl + "/books/"+ id,
            json : {year : 2000},
            headers: {
                'Authorization': 'Bearer ' + token
              }
            },function(error,response,body){
                assert.equal(response.statusCode, 201);
                assert.equal(body.message, "update book id: "+id)
                done();
            });
        });

        // delete book test with token
    it('\033[1;94mDelete Book Test With Token And ID\033[0m', function(done){
        request.delete({
            url : apiUrl + "/books/"+ id,
            headers: {
                'Authorization': 'Bearer ' + token
              }
            },function(error,response,body){
                assert.equal(response.statusCode, 200);
                done();
            });
        }); 
})


describe("User Errors", ()=>{
  it("\033[1;94mWrong Email And Password\033[0m", (done)=>{
    request.post(apiUrl+ '/user/login', {email : "fail", password : "none"}, function(err,res,body){
            
      
      assert.equal(res.statusCode,400);
      done();
  })

  })
})