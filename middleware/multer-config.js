/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const multer = require('multer');

/*=============================================================*/
/*------------------------ VARIABLE ---------------------------*/
/*=============================================================*/
/*=== Used to find good extention ===*/
const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
}

/*=== Init config of diskStorage ===*/
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'images')
    },
    filename :(req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('_').split('.')[0];
        const extention = MIME_TYPES[file.mimetype];  
        cb(null, name + Date.now() + "." + extention);
    }
});

module.exports = multer({storage : storage}).single('image');

//https://expressjs.com/en/resources/middleware/multer.html