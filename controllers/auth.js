const bcrypt = require('bcrypt');

const User = require('../models/users');

/*=== Crypt the password from the request, create a user and save the users in the DB ===*/
exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password , 10)
        .then( hash =>{
            const user = new User({
                email : req.body.email,
                password : hash
            });
            
            user.save()
            .then(() => res.status(201).json({message : "Nouvelle utilisateur crée"}))
            .catch(error => res.status(400).json({message : "Impossible de créer un nouvelle utilisateur", error : error}))
        })
        .catch( error => res.status(500).json({message : "hash not working", error : error}));
};

/*exports.login = (req, res, next) = {

};*/


// Bcrypt doc : https://openbase.com/js/bcrypt/documentation