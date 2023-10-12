const { validationResult, body } = require("express-validator");
const { response } = require("../response");
const jwt = require("jsonwebtoken");
const User = require("../models/model-user");

module.exports.signupValidation = [
   body("name").trim().notEmpty().withMessage("Require input field"),
   body("email")
      .trim()
      .notEmpty()
      .withMessage("Require input field")
      .isEmail()
      .withMessage("Not a valid e-mail address")
      .custom(async (value) => {
         const isEmpty = await User.findOne({ email: value });

         if (isEmpty?.email) {
            throw new Error("E-mail already in use");
         }
      }),
   body("password").trim().notEmpty().withMessage("Require input field").isLength({ min: 3 }).withMessage("Password too short"),
   (req, res, next) => {
      const result = validationResult(req);

      if (!result.isEmpty()) {
         return response(402, "Error!", res, result.array());
      }

      next();
   },
];

module.exports.signinValidation = [
   body("email").trim().notEmpty().withMessage("Require input field"),
   body("password").trim().notEmpty().withMessage("Require input field"),
   (req, res, next) => {
      const result = validationResult(req);

      if (!result.isEmpty()) {
         return response(402, "Error!", res, result.array());
      }

      next();
   },
];

module.exports.tokenValidation = (req, res, next) => {
   const token = req.headers["auth-token"];

   if (token) {
      jwt.verify(token, "@Ridhomantap11", function (err, decoded) {
         if (err) console.log("error: ", err);

         req.user = decoded;
         next();
      });
   }
};
