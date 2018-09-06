const  multer = require('multer');
const path = require('path');

imageFolder = path.join(__dirname,  `../../static/image/book-image`);
defaultFolder = path.join(__dirname,  `../../static/image/default`);

const imageFilter = function (_req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const saveFile = () => {
  var storage = multer.diskStorage({
    destination: (req, _file, cb) => {
      switch (req.params.title) {
        case 'book-image':
          cb(null, imageFolder);
          break;
        default:
          cb(null, defaultFolder);
      }
    },
    filename: (req, file, cb) => {
      if (req.params.id) {
          cb(null, req.params.id + '.' + file.mimetype.slice(6, 10));
      } else {
          cb(null, file.originalname);
      }
    }
  });
  var upload = multer({ storage: storage, fileFilter: imageFilter });
    return upload;
}

module.exports = saveFile;