const assert = require('assert');
const request = require('request');


// API url
const apiUrl = 'http://localhost:3000';
let token;


describe("bookstore api test", ()=>{
    let user;
    let id;

    console.log("⚠️  \033[1;91mYour server must be up for this test to run. Please make sure the server is up\033[0m");

    if(!process.argv[3] && !process.argv[4]){
        console.log("please enter mail and password after npm test script");
        console.info("\033[1;95mnpm test <email> <password>\033[0m");
        return (0);
    }
    else
        user = {email : process.argv[3] , password : process.argv[4]}


     // API Login Request Test
    it("\033[1;94mLogin Request Test\033[0m", (done)=>{
        request.post(apiUrl+ '/user/login', {json : user}, function(err,res,body){
            
            token = body.token;
            assert.equal(res.statusCode,200);
            assert.equal(body.message, "Token is generated. This token is valid for 15 minutes. Login again after 15 minutes");
            done();
        })
    })


      // get all books test wtih token
    it('\033[1;94mGet All Books Test With Token\033[0m', function(done) {
        request.get({
          url: apiUrl + '/books',
          headers: {
            'Authorization': 'Bearer ' + token
          }
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
            console.log("blog içi id: " + id);
          assert.equal(response.statusCode, 201);
          done();
        });
      });

        // retrivrBook test with token
    it('\033[1;94mRetrieve Book Test With Token And ID\033[0m', function(done){
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
                // console.log(body.message, "update book id: "+id);
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