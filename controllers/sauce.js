/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const Sauce = require('../models/sauces');
const fs = require('fs');


/*=============================================================*/
/*------------------------ FUNCTIONS --------------------------*/
/*=============================================================*/

/*=== Create a new sauce in DB ===*/
exports.create = (req, res, next) => {
    const sauceObj = JSON.parse(req.body.sauce);
    delete sauceObj._id;
    const sauce = new Sauce({
        ...sauceObj,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId : req.auth.userId
        
    });
    sauce.save()
        .then(() => res.status(201).json({message : "Nouvelle sauce crée !"}))
        .catch(error => res.status(401));
};


/*=== Find all sauces in DB ===*/
exports.getAll = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json(error));
}

/*=== Find one sauce with id ===*/
exports.getOne = (req,res, next) => {
    Sauce.findOne({_id : req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}))
}

/*=== Modify a sauce with or without picture added ===*/
exports.modify = (req, res, next) => {
    const newSauceValue = req.file ? 
    {...JSON.parse(req.body.sauce),       
    imageUrl :`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    _id : req.params.id} 
    :
    {...req.body,    
        _id : req.params.id} 
    
        Sauce.findOne({_id : req.params.id})
            .then((sauce) => {
                if (sauce.userId === req.auth.userId){
                    if (req.file){
                        const filename = sauce.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, (err) =>{
                            if (err){
                                console.error("error deleting image");
                            }
                        })
                    }
                    Sauce.updateOne({_id : req.params.id}, newSauceValue)
                    .then(() => res.status(201).json({message : "Sauce modifié"}))
                    .catch(error => res.status(400).json({error}))
                } else {
                res.status(403).json({message : "Unauthorized"});
                }
                
            })     
}

/*=== Delete a Sauce from DB ===*/
exports.delete = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
        .then((sauce) => {
            if (sauce.userId === req.auth.userId){
                Sauce.deleteOne({_id : req.params.id})
                    .then(() => res.status(200).json({message : "Sauce supprimé"}))
                    .catch(error => res.status(400).json({error}))
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err) =>{
                    if (err){
                        console.error("error deleting image");
                    }
                })
            } else {
                res.status(403).json({message : "Unauthorized"});
            }
            
        }
        )
        .catch(error => res.status(404).json({message : "Sauce non présente in DataBase", error : error}))
}

/*=== Add or remove a Like or Dislike ===*/
exports.likeOrDislike = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
        .then((sauce) =>{

            if (req.body.like === 1){
                if (!(sauce.usersLiked.includes(req.body.userId) || sauce.usersDisliked.includes(req.body.userId))){
                    sauce.likes = sauce.likes +1;
                    sauce.usersLiked.push(req.body.userId);
                }
            }
            if (req.body.like === 0){
                if (sauce.usersLiked.includes(req.body.userId)){
                    sauce.likes = sauce.likes - 1;
                    sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1);
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    sauce.dislikes = sauce.dislikes - 1;
                    sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1);
                }  
            } 
            if (req.body.like === -1){
                if (!(sauce.usersLiked.includes(req.body.userId) || sauce.usersDisliked.includes(req.body.userId))){
                    sauce.dislikes = sauce.dislikes + 1;
                    sauce.usersDisliked.push(req.body.userId);
                }
            }
            Sauce.updateOne({_id : req.params.id}, sauce)
                .then(()=> res.status(201).json({message : "Modification des likes ou dislikes"}))
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(404).json({message : "Sauce non présente in DataBase", error : error}))
}


  //https://www.geeksforgeeks.org/node-js-fs-unlink-method/