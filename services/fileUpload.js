const aws =require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
aws.config.update({
    secretAccessKey: 'QB1K4qIKL9Ad7sZjQGG0HoK7CzoI8mTxas2zBfli',
    accessKeyId:'AKIATMYC6J76BIC6EOJF',
    region: 'ap-northeast-2'
});

const s3 = new aws.S3();
const fileFilter = (req,file,cb)=>{
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
    fileFilter,
    storage: multerS3({
        s3:s3,
        bucket:'vodonesia.id/Room',
        acl: 'public-read',
        key: (req,file,cb)=>{
            cb(null, `${Date.now()}_${file.originalname}`)
        }
    })
});

module.exports = upload;