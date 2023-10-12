const bcrypt = require("bcrypt");

module.exports.passwordHash = (pass) => {
   const saltRounds = 10;

   const hash = bcrypt.hashSync(pass, saltRounds);
   return hash;
};

module.exports.passwordVerify = (pass, hash) => {
   const verify = bcrypt.compareSync(pass, hash);
   return verify;
};
