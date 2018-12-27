const express = require('express');
const router = express.Router();

const awsController = require('../controllers/aws.controller.js')

var aws = require('aws-sdk'), // ^2.2.41
    multer = require('multer'); // "multer": "^1.1.0"


aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // region: "ap-south-1",
});



const upload = multer({ dest: 'images/', limits: { fileSize: 10000000 } });


router.post('/upload', upload.any(), awsController.uploadpic);

router.get('/', awsController.test);

module.exports = router;
