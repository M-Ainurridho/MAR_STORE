const multer = require("multer");
const path = require("path");

const avatarConfig = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../client/src/assets/images/avatars"));
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, "avatar" + "-" + uniqueSuffix);
   },
});

const proofConfig = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../client/src/assets/images/proof_of_payment"));
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, "proof" + "-" + uniqueSuffix);
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

module.exports.changeAvatar = multer({ avatarConfig, fileFilter });
module.exports.proofPayment = multer({ storage: proofConfig, fileFilter });
