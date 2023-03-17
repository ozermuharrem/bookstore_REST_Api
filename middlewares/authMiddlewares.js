const jwt = require('jsonwebtoken');

// token check 
module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'togggle.com')
        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            res.status(401).json({
                message : "TokenExpiredError. Token expired"
            })
        }
        else if(error.name === 'JsonWebTokenEror'){
            res.status(401).json({
                message : "JsonWebTokenEror. Access with an invalid token or signature"
            })
        }
        else{
            res.status(401).json({
                message : 'Unauthorized access'
            })
        }
    }
}
