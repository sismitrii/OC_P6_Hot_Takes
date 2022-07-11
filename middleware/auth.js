/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const jwt = require('jsonwebtoken');


/*=============================================================*/
/*------------------------ FUNCTIONS --------------------------*/
/*=============================================================*/

/*=== At every request we set req.auth with ==*/
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization header is on that form "Bearer ToKeN.."
        const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD); // decodeToken contain {userId} of logged user
        req.auth = { userId : decodedToken.userId};  
        next();
    } catch(error){
        res.status(401).json({message : "Erreur d'authentification", error : error});
    }
}
