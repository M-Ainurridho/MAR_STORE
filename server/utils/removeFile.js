const fs = require("fs");
const path = require("path");

module.exports.removeFile = (filename) => {
   fs.unlinkSync(path.join(__dirname, `../../client/src/assets/images/avatars/${filename}`));
   return;
};
