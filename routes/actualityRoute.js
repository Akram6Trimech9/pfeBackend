 const express = require('express');
const router = express.Router();
const actualityController = require('../controller/actualityController');
const multer = require('multer');

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  
  }
});

const upload = multer({ storage: storage });

 router.post('/', upload.single('file'), actualityController.createActuality);
router.get('/', actualityController.getAllActualities);

module.exports = router;