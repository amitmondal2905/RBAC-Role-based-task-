//multer

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({});

const fileFilter = (req, file, callback)=>{
    if(file.mimetype.startsWith('image') || file.mimetype === 'application/png'){
        callback(null, true)
    }else{
        callback(new Error("Only images and pdfs are allowed"), false)
    }


}

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 5*1024*1024}
})

module.exports=upload;