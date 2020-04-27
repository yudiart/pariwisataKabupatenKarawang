const aws =require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config =require('../config/default.json');

aws.config.update({
    secretAccessKey: config.AWS_ACCESS_KEY,
    accessKeyId: config.AWS_SECRET_ACCESS,
    region: config.region
});

const s3 = new aws.S3();
const filefilter = (req,file,cb)=>{
    if(
        file.mimetype === 'image/jpeg'||
        file.mimetype === 'image/png'||
        file.mimetype === 'image/jpg'
    ){
        cb(null,true)
    }else{
        cb({msg:'not extension itu'})
    }
}

const upload = multer({
    filefilter,
    storage: multerS3({
        s3:s3,
        bucket: 'kamar-images',
        acl: 'public-read',
        key: (req,file,cb)=>{
            cb(null, `${Date.now()}_${file.originalname}`)
        }
    })
});

module.exports = upload;