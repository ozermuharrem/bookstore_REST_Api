const jwt = require('jsonwebtoken');

exports.login = async (req,res,next) => {
    try {
        const email = req.body.email;
        const token = jwt.sign({
            email:email,
            exp: Math.floor(Date.now()/1000)+900,
            issuer : "mozer", 
        }, 'togggle.com')

        res.status(200).json({
            message : "Token is generated. This token is valid for 15 minutes. Login again after 15 minutes",
            token
        })
    } catch (error) {
        
    }
}