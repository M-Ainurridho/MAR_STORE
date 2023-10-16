const { validationResult, body } = require("express-validator");
const { response } = require("../response");
const jwt = require("jsonwebtoken");
const User = require("../models/model-user");
const { passwordVerify } = require("./hash");

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
   body("email").trim().notEmpty().withMessage("Require input field").isEmail().withMessage("Not a valid e-mail address"),
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

module.exports.editUserValidation = [
   body("name").trim().notEmpty().withMessage("Require input field"),
   body("email").trim().notEmpty().withMessage("Require input field").isEmail()
   .withMessage("Not a valid e-mail address"),
   (req, res, next) => {
      const result = validationResult(req);

      if (!result.isEmpty()) {
         return response(402, "Error!", res, result.array());
      }

      next();
   },
];

module.exports.changePasswordValidation = [
   body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("Require input field")
      .custom(async (value, { req }) => {
         const user = await User.findOne({ _id: req.params._id });
         if (!passwordVerify(value, user.password)) throw new Error("Current password is wrong");
      }),
   body("newPass").trim().notEmpty().withMessage("Require input field").isLength({ min: 3 }).withMessage("Password too short"),
   body("confirmPass")
      .trim()
      .notEmpty()
      .withMessage("Require input field")
      .custom((value, { req }) => {
         if (value !== req.body.newPass) throw new Error("Password isn't match");

         return true;
      }),
   (req, res, next) => {
      const result = validationResult(req);

      if (!result.isEmpty()) {
         return response(402, "Error!", res, result.array());
      }

      next();
   },
];
