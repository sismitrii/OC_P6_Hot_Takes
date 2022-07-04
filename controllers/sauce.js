const Sauce = require('../models/sauces');
const fs = require('fs');

exports.create = (req, res, next) => {
    const sauceObj = JSON.parse(req.body.sauce);
    delete sauceObj._id;
    const sauce = new Sauce({
        ...sauceObj,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId : req.auth.userId
        
    });
    console.log(sauce);
    sauce.save()
        .then(() => res.status(201).json({message : "Nouvelle sauce crée !"}))
        .catch(error => res.status(401));
};

exports.getAll = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json(error));
}

exports.getOne = (req,res, next) => {
    Sauce.findOne({_id : req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}))
}

exports.modify = (req, res, next) => {
    const newSauceValue = req.file ? // if req.file
    {...JSON.parse(req.body.sauce),       //true
    imageUrl :`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    _id : req.params.id} 
    :
    {...req.body,     //false 
        _id : req.params.id} 
    if (newSauceValue.userId === req.auth.userId){      
        Sauce.updateOne({_id : req.params.id}, newSauceValue)
            .then(() => res.status(201).json({message : "Sauce modifié"}))
            .catch(error => res.status(400).json({error}))
    } else {
        res.status(401).json({message : "Unauthorized"});
    }
}

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
                res.status(401).json({message : "Unauthorized"});
            }
            
        }
        )
        .catch(error => res.status(404).json({message : "Objet inexistant", error : error}))
}