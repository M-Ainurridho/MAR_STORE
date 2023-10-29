const fs = require("fs");
const path = require("path");

module.exports.removeFile = (dir, filename) => {
   fs.unlinkSync(path.join(__dirname, `../../client/src/assets/images/${dir}/${filename}`));
   return;
};
