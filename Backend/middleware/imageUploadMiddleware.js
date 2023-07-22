import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current file's URL and convert it to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory path of the current file
const __dirname = dirname(__filename);

// Get the absolute path to the "uploads" folder
const uploadDir = join(__dirname, '../uploads');

// multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // make sure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // remove spaces and special characters from original filename
    var originalname = file.originalname.replace(/[^a-zA-Z0-9]/g, '');
    // set filename to fieldname + current date + original filename
    cb(null, file.fieldname + "_" + Date.now() + "_" + originalname);
  },
});
var upload = multer({
  storage: storage,
}).single('photo');

export { upload };
