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
            status: 'fail',
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
        status: 'fail',
        error,
      });
    }
  };
/* / -----




exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {

          if(same)
          {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
          }else{
            req.flash("err","Parola Hatalı!");
            res.status(400).redirect('/login');
          }
        });
      }else{
        req.flash("err","Kullanıcı Mevcut Değil!");
        res.status(400).redirect('/login');
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(()=> {
    res.redirect('/');
  })
}


exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id:req.session.userID}).populate('courses');
  const categories = await Category.find();
  const courses = await Course.find({user:req.session.userID})
  const users = await User.find({});
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
    users
  });
};

exports.deleteUser = async (req, res) => {
  try {    
  await User.findByIdAndRemove(req.params.id);
  await Course.deleteMany({user:req.params.id});

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}; */