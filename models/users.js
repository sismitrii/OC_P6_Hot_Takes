/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/*=============================================================*/
/*------------------------ Schema -----------------------------*/
/*=============================================================*/
const userSchema = mongoose.Schema({ // By default, Mongoose adds an _id property to your schemas.
    email : {type : String, required : true, unique: true},
    password : {type : String, required : true}
})

userSchema.plugin(uniqueValidator); // Allowed to have a understandable error better than E11000

module.exports = mongoose.model('User', userSchema);


//https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType
// https://www.npmjs.com/package/mongoose-unique-validator

