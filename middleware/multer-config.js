const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
}

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, '/images')
    },
    filename :(req, file, cb) => {
        const name = file.fieldname.split(' ').join('_'); //.toLowerCase();
        const extention = MIME_TYPES[file.mimetype];  // file.mymetype.split('/')[1] possible ? error jpeg ?
        cb(null, name + Date.now() + "." + extention);
    }
});

module.exports = multer({storage}).single('image'); // is storage work replace by dest ?

//https://expressjs.com/en/resources/middleware/multer.html