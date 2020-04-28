const aws =require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-1'
});
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
        bucket: process.env.S3_BUCKET_NAME || 'kamar-images',
        acl: 'public-read',
        key: (req,file,cb)=>{
            cb(null, `${Date.now()}_${file.originalname}`)
        }
    })
});

module.exports = upload;