const express = require('express');
const router = express.Router();

const testController = require('../controllers/test.controller.js')

var aws = require('aws-sdk'), // ^2.2.41
    multer = require('multer'); // "multer": "^1.1.0"


aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // region: "ap-south-1",
});



const upload = multer({ dest: 'images/', limits: { fileSize: 10000000 } });


router.post('/upload', upload.any(), testController.uploadpic);

router.get('/', testController.test);

module.exports = router;
