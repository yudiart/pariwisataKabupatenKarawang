const aws =require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
aws.config.update({
    secretAccessKey: '7Zv/heqqnLCi9CFhtvsLgR8asfa/7FINx7B6xc07',
    accessKeyId:'AKIAJ7GMJI7QJ6QD53LQ',
    region: 'eu-west-3'
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
        bucket: 'room-image',
        acl: 'public-read',
        key: (req,file,cb)=>{
            cb(null, `${Date.now()}_${file.originalname}`)
        }
    })
});

module.exports = upload;