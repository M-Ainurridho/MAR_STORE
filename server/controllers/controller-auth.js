const User = require("../models/model-user");
const { response } = require("../response");
const { passwordHash, passwordVerify } = require("../utils/hash");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   let { name, email, password } = req.body;
   password = passwordHash(password);

   try {
      const newUser = await new User({ name, email, password }).save();
      return response(200, "Successful! insert new user", res, newUser);
   } catch (err) {
      console.log("error: ", err);
      return response(402, "Failed! insert new user", res, err);
   }
};

const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });

      if (user !== null) {
         const verify = passwordVerify(password, user.password);

         if (verify) {
            jwt.sign({ _id: user._id }, "@Ridhomantap11", { expiresIn: "1h" }, (err, token) => {
               if (err) console.log("error: ", err);

               return res.json({ token });
            });
         } else {
            return response(402, "Something wrong!", res, [{ path: "password", msg: "Wrong password" }]);
         }
      } else {
         return response(404, "404, Not Found", res, [{ path: "email", msg: "Email isn't registered" }]);
      }
   } catch (err) {
      console.log("error: ", err);
   }
};

const userInfo = async (req, res) => {
   const { _id } = req.user;

   try {
      const user = await User.findOne({ _id });
      return response(200, "Get user info", res, user);
   } catch (err) {
      console.log("error: ", err);
   }
};

module.exports = {
   register,
   login,
   userInfo,
};
