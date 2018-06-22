AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const s3 = new AWS.S3();

	// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');

exports.test = function (req, res) {


  res.render('index', {
    title: 'Test',
  });
}

exports.uploadpic = function (req, res) {
    var file = req.files[0];
    console.log("in",file.originalname)
    fs.readFile(file.path, function (err, data) {
        if (err) throw err; // Something went wrong!
        var s3bucket = new AWS.S3({params: {Bucket: 'asiapacific211095'}});
        s3bucket.createBucket(function () {
            var params = {
                Key: file.originalname, //file.name doesn't exist as a property
                Body: data
            };
            s3bucket.upload(params, function (err, data) {
            	console.log(" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n",data)
                // Whether there is an error or not, delete the temp file
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('Temp File Delete');
                });

                console.log("PRINT FILE:", file);
                if (err) {
                    console.log('ERROR MSG: ', err);
                    res.status(500).send(err);
                } else {
                    console.log('Successfully uploaded data');
                    res.status(200).end("Successfully uploaded data");
                }
            });
        });
    });
};
