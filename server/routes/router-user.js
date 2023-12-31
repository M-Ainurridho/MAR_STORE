const router = require("express").Router();
const { user } = require("../controllers");
const { changeAvatar, proofPayment } = require("../utils/uploadFile");
const { editUserValidation, changePasswordValidation } = require("../utils/validation");

// GET
router.get("/", user.getAllUser);
router.get("/cart/:_id", user.getCartByUserId);
router.get("/menu", user.getUserMenu);
router.get("/menu/search?", user.searchRequest);
router.get("/submenu/:_id", user.searchSubmenu);
router.get("/access?", user.checkUserAccess);
router.get("/payments?", user.getAllPayments);
router.get("/payments/:userId", user.getPaymentByUserId);
router.get("/payments/detail/:_id", user.getDetailPaymentById);
// POST
router.post("/addcart", user.addNewCart);
router.post("/addmenu", user.addNewMenu);
router.post("/addsubmenu", user.addNewSubmenu);
router.post("/payments", user.addPayments);
// DELETE
router.delete("/cart", user.deleteCartByUserId);
router.delete("/deletemenu", user.deleteMenuById);
router.delete("/deletesubmenu", user.deleteSubmenuById);
// PATCH
router.patch("/edit/with_image/:_id", changeAvatar.single("image"), user.editProfileWithImage);
router.patch("/edit/without_image/:_id", editUserValidation, user.editProfileWithoutImage);
router.patch("/updatemenu/:_id", user.updateUserMenu);
router.patch("/updatesubmenu/:_id", user.updateSubmenu);
router.patch("/changepassword/:_id", changePasswordValidation, user.changePassword);
router.patch("/cart/:_id", user.updateCartQuantity);
router.patch("/payments/:_id", proofPayment.single("upload_proof"), user.uploadProof);

module.exports = router;
