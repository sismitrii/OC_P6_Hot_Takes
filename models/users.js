const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({ // By default, Mongoose adds an _id property to your schemas.
    email : {type : string, required : true, unique: true},
    password : {type : string, required : true}
})

userSchema.plugin(uniqueValidator); // Allowed to have a understandable error better than E11000

module.exports = mongoose.model('User', userSchema);


//https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType
// https://www.npmjs.com/package/mongoose-unique-validator

/*Mongoose will refuse to save a document that doesn't have
an _id, so you're responsible for setting _id if you define your own _id path.*/