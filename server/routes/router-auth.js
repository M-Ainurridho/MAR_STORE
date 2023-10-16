const router = require("express").Router();
const { signupValidation, signinValidation, tokenValidation } = require("../utils/validation");
const { auth } = require("../controllers");

router.post("/signin", signinValidation, auth.login);
router.post("/signup", signupValidation, auth.register);
router.get("/exchangetoken", tokenValidation, auth.userInfo);

module.exports = router;
