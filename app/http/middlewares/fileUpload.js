const multer = require('multer');
const path = require('path');


const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/profile/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${new Date().getTime()}${ext}`;
    return cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  //accepts a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true)

  //rejects a file
  else
    cb(new Error("Not a supported file type! (Only jpej and png supported)"), false);


}

const fileUpload = multer({
  storage: diskStorage,
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter
});

module.exports = fileUpload;