const express = require('express');
const router = express.Router();

const testController = require('../controllers/test.controller.js')

var aws = require('aws-sdk'), // ^2.2.41
    multer = require('multer'), // "multer": "^1.1.0"
    multerS3 = require('multer-s3'); //"^1.4.1"

// aws.config.update({region: 'ap-south-1'});
// aws.config.update({secretAccessKey: 'cKBryb/1ynsXrPsE9QE71urr/HMsa7Ks86hmVN4B'});
// aws.config.update({accessKeyId: 'AKIAJ2GPF6Y4SV34G4AQ'});

var s3 = new aws.S3();


const upload = multer({ dest: 'images/', limits: { fileSize: 10000000 } });

//used by upload form
router.post('/upload', upload.any(), testController.uploadpic);

router.get('/', testController.test);

module.exports = router;
