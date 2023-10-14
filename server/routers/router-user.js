const router = require("express").Router();
const { user } = require("../controllers");

// GET
router.get("/cart/:_id", user.getCartByUserId);
router.get("/menu", user.getUserMenu);
router.get("/menu/search?", user.searchRequest);
router.get("/submenu/:_id", user.searchSubmenu);
router.get("/access?", user.checkUserAccess);
// POST
router.post("/addcart", user.addNewCart);
router.post("/addmenu", user.addNewMenu);
router.post("/addsubmenu", user.addNewSubmenu);
// router.post("/addsubmenu", user.addNewSubmenu);
// DELETE
router.delete("/cart", user.deleteCartByUserId);
router.delete("/deletemenu", user.deleteMenuById);
router.delete("/deletesubmenu", user.deleteSubmenuById);
// PATCH
router.patch("/updatemenu/:_id", user.updateUserMenu)
router.patch("/updatesubmenu/:_id", user.updateSubmenu)

module.exports = router;
