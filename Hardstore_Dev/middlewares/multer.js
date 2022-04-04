const multer = require("multer");
const path = require("path");

//Esta funcio es implementada para reutilizar este codigo tanto para 
//la carga de productos como para los avatares de usuarios
function multerWraper(tipe){
    let imagePath
    if (tipe == "products"){
        imagePath = '../public/images/products'
    }else{
        if(tipe == "users"){
        imagePath = '../public/images/users'
    }}

    //multer
    var storage = multer.diskStorage({
        destination: function (req, file, cb){
            let folder_path = path.join(__dirname, imagePath);
            cb(null, folder_path)
        },
        filename: function (req, file, cb){
            let image_name =  `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
            cb(null, image_name)
        }
    })
    // validacion de formato de multer
    var uploadFile = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']   
            if (whitelist.includes(file.mimetype)){
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });

    return uploadFile
}

module.exports = multerWraper