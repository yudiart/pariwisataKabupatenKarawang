const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now()+ext)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        if (
            file.mimeType === 'image/png' ||
            file.mimeType === 'image.jpg'
        ){
            callback(null,true)
        }else{
            console.log('only jpg & png file supported!')
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload