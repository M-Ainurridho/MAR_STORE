const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../client/src/assets/images/avatars"));
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, "upload" + "-" + uniqueSuffix);
   },
});

function fileFilter(req, file, cb) {
   const allowFile = ["image/jpg", "image/jpeg", "image/png"];
   if (allowFile.includes(file.mimetype)) {
      cb(null, true);
   } else {
      cb(null, false);
   }
}

module.exports.upload = multer({ storage, fileFilter });
