const expect = require('chai');
const addClient = require('../controller/bookController');
const User = require('../Models/User');
const assert = require('assert');
const request = require('request');
// API endpoint
const apiUrl = 'http://localhost:3000';
let token;


//const argv = {email : process.argv.slice(3) , password : process.argv.slice(4)}
// console.log(process.argv[3]);




// process.stdin.setEncoding('utf8');

// console.log('Lütfen bir girdi girin: ');

// process.stdin.on('data',  (data)=> {
//  let email =  data;
//  let password = data;    
// });

// process.stdin.on('end', ()=>{});

describe("bookstore api test", ()=>{
    let user;
    if(!process.argv[3] && !process.argv[4]){
        console.log("please enter mail and password after npm test script");
        console.info("\033[1;95mnpm test <email> <password>\033[0m");
        return (0);
    }
    else
        user = {email : process.argv[3] , password : process.argv[4]}


    // API endpoint'ine GET isteği gönderen test senaryosu
    it("login request", (done)=>{
   
        //const user = {email : email , password : password}
        //arrange teste girdi olarak verilecek değerleri ve beklediğimiz sonuçları yazıyoruz
        request.post(apiUrl+ '/user/login', {json : user}, function(err,res,body){
            
            token = body.token;
            assert.equal(res.statusCode,200);
            assert.equal(body.message, "Token is generated. This token is valid for 15 minutes. Login again after 15 minutes");
            done();
        })
    })

    it('should return 200 status code with a valid token', function(done) {
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
})