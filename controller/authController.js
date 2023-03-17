const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

//create user

exports.createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
  
      res.status(201).json({
          message : 'User created successfully',
          user
      });
    } catch (error) {
          res.status(400).json({
              message : "User could not be created",
              error
          })
  }};

// login user
exports.login = async (req,res,next) => {
    try {
        const { email, password } = req.body;

        const user =  await User.findOne({ email }) 
        if(user){
            bcrypt.compare(password,user.password, (err,same) =>{
                if(same)
                {
                    const token = jwt.sign({
                        email : email,
                        exp: Math.floor(Date.now()/1000)+900,
                        issuer : "mozer",
                    }, 'togggle.com');
                    res.status(200).json({
                        message : "Token is generated. This token is valid for 15 minutes. Login again after 15 minutes",
                        token
                    })
                }else
                    throw "the password is incorrect";  
            });
        }else
            throw 'user not available';
    }catch (error) {
        res.status(400).json({
            message: 'fail',
            error
    });
}};


// logOut User

exports.logoutUser = (req, res) => {
    req.session.destroy(()=> {
      res.redirect('/');
    })
  }

  // delete user 

  exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndRemove({_id : req.params._id})
        if(!user)
            throw "no user";
        res.status(200).json({
            message : "user deleted",
        });
    } catch (error) {
      res.status(400).json({
        message: 'fail',
        error,
      });
    }
  };
