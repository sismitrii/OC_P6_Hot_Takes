const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId : {type : String, required : true},
    name : {type : String, required :true},
    manufacturer : {String},
    description : {String},
    mainPepper : {String},
    heat : {Number},
    likes : {type : Number, default: 0},
    dislikes : {type : Number, default : 0},
    usersLiked : {type : Array, default : []},
    usersDisliked : {type : Array, default : []}
})

// is all the data really required ?
// Good idea to set default value ?

module.exports('Sauce', sauceSchema);