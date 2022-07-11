/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const express = require('express');

const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/*=============================================================*/
/*------------------------ ROUTES -----------------------------*/
/*=============================================================*/
router.post('/',auth ,multer, sauceCtrl.create);
router.get('/', sauceCtrl.getAll);
router.get('/:id',sauceCtrl.getOne);
router.put('/:id',auth ,multer, sauceCtrl.modify);
router.delete('/:id',auth ,sauceCtrl.delete);
router.post('/:id/like', auth, sauceCtrl.likeOrDislike);

module.exports = router;