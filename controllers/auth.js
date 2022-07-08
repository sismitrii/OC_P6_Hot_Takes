/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const bcrypt = require('bcrypt');  // Bcrypt doc : https://openbase.com/js/bcrypt/documentation
const jwt = require('jsonwebtoken'); // Jwt : https://www.ionos.fr/digitalguide/sites-internet/developpement-web/json-web-token-jwt/

const User = require('../models/users');


/*=============================================================*/
/*------------------------ FUNCTIONS --------------------------*/
/*=============================================================*/

/*=== Crypt the password from the request, create a user and save the users in the DB ===*/
exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password , 10)
        .then( hash =>{
            const user = new User({
                email : req.body.email,
                password : hash
            });
            
            user.save()
            .then(() => res.status(201).json({message : "Nouvel utilisateur crée"}))
            .catch(error => res.status(400).json({message : "Impossible de créer un nouvelle utilisateur", error : error}))
        })
        .catch( error => res.status(500).json({message : "hash not working", error : error}));
};

/*=== Find user in DB with the same email and check if the password is the same ===*/
exports.login = (req, res, next) => {
    User.findOne({email : req.body.email})
        .then((user) => {
            if (user === null){
                return res.status(401).json({message : "Email Incorrect"});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (valid === false){
                        return res.status(401).json({message : "Mot de passe incorrect"});
                    }
                    res.status(200).json({
                        userId : user._id,
                        token : jwt.sign(
                            {userId : user._id},
                            'KkHTYXxQVbEfYB7Npj7w9Btz', // MOT DE PASSE A trouver comment obtenir qch de secure !!!!!!!!!!!!
                            {expiresIn : '8h'} // Quel durée mettre ?
                        )
                        });
                })
                .catch(error => res.status(500).json({message : "compare not working", error : error}));


        })
        .catch(error => res.status(500).json({message : "login/findOne not working", error : error}));
};



