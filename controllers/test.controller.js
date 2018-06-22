AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
// const s3 = new AWS.S3();

	// Load the SDK and UUID
var AWS = require('aws-sdk');

exports.test = function (req, res) {
  res.render('index', {
    title: 'Test',
  });
}

exports.uploadpic = function (req, res) {
    var file = req.files[0];
    fs.readFile(file.path, function (err, data) {
        if (err) throw err; // Something went wrong!
        var s3bucket = new AWS.S3({params: {Bucket: process.env.BUCKET_NAME}});
        s3bucket.createBucket(function () {
            var params = {
                Key: file.originalname, //file.name doesn't exist as a property
                Body: data
            };
            s3bucket.upload(params, function (err, data) {
                // Whether there is an error or not, delete the temp file
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('Temp File Delete');
                });
                if (err) {

                    res.status(500).send(err);
                } else {
                    res.status(200).end("success.");
                }
            });
        });
    });
};
