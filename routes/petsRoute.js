var express = require('express');
var router = express.Router();

const multer = require('multer');
const path = require('path');

const { registerPet, listMyPets, updatePet } = require('../controller/petsController');
const { verifyToken } = require('../middleware/Auth/Auth');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage,
    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return callback(new Error('Only images files.'))
        }
        callback(null, true)
    }
});

router.post('/registerPet', upload.array('image'), registerPet);
router.get('/listMyPets', listMyPets);
router.patch('/updatePet', updatePet)

module.exports = router;