const { response } = require("../response");
const User = require("../models/model-user");
const Menu = require("../models/model-menu");
const { default: mongoose } = require("mongoose");
const fs = require("fs");
const { removeFile } = require("../utils/removeFile");

const getCartByUserId = async (req, res) => {
   const { _id } = req.params;

   try {
      const user = await User.findOne({ _id });
      return response(200, "Get Cart By User Id", res, user.carts);
   } catch (err) {
      console.log("error: ", err);
   }
};

const addNewCart = async (req, res) => {
   const { user_id, _id, name, brand, image, price, quantity, discount } = req.body;

   const duplicate = await User.findOne({ _id: user_id, "carts._id": _id });

   if (duplicate) return response(303, "Existing Data", res, duplicate);
   await User.findOneAndUpdate({ _id: user_id }, { $push: { carts: { _id, name, brand, image, price, quantity, discount } } });
};

const deleteCartByUserId = async (req, res) => {
   const { user_id, _id } = req.body;

   try {
      const dltCart = await User.findOneAndUpdate({ _id: user_id }, { $pull: { carts: { _id } } });
      return response(200, "Delete Cart By User Id", res, { user_id, _id });
   } catch (err) {
      console.log("error: ", err);
   }
};

const getUserMenu = async (req, res) => {
   try {
      const menu = await Menu.find();
      response(200, "Get User Menu", res, menu);
   } catch (err) {
      console.log("error: ", err);
   }
};

const searchRequest = async (req, res) => {
   const { role, _id } = req.query;

   if (role) {
      try {
         const menu = await Menu.find({ user_access: role.toLowerCase() });
         return response(200, "Get User Menu by Role", res, menu);
      } catch (err) {
         return console.log("error: ", err);
      }
   }

   if (_id) {
      try {
         const menu = await Menu.findOne({ _id });
         return response(200, "Get User Menu by Id", res, menu);
      } catch (err) {
         return console.log("error: ", err);
      }
   }
};

const addNewMenu = async (req, res) => {
   const { menu, userAccess } = req.body;

   try {
      const addMenu = await new Menu({ name: menu.toUpperCase(), user_access: userAccess }).save();
      response(200, "Successfully! Add New Menu", res, addMenu);
   } catch (err) {
      console.log("error: ", err);
   }
};

const deleteMenuById = async (req, res) => {
   const { _id } = req.body;

   try {
      const deleteMenu = await Menu.findOneAndDelete({ _id });
      response(200, `Successfully! Delete Menu ${deleteMenu.name}`, res, deleteMenu);
   } catch (err) {
      console.log("error: ", err);
   }
};

const updateUserMenu = async (req, res) => {
   const { _id } = req.params;
   const { menu, userAccess } = req.body;

   try {
      const update = await Menu.findOneAndUpdate({ _id }, { $set: { name: menu.toUpperCase(), user_access: userAccess } });
      response(200, `Successfully! Update Menu`, res, menu);
   } catch (err) {
      console.log("error: ", err);
   }
};

const addNewSubmenu = async (req, res) => {
   const { submenu, menu, icon, link } = req.body;

   try {
      const addSubmenu = await Menu.findOneAndUpdate({ name: menu }, { $push: { submenu: { _id: new mongoose.Types.ObjectId(), name: submenu, icon, link } } });
      response(200, `Successfully! Add New Submenu`, res, addSubmenu);
   } catch (err) {
      console.log("error: ", err);
   }
};

const searchSubmenu = async (req, res) => {
   const { _id } = req.params;

   try {
      const search = await Menu.findOne({ "submenu._id": _id });
      response(200, "Result Seached Submenu", res, search);
   } catch (err) {
      console.log("error: ", err);
   }
};

const deleteSubmenuById = async (req, res) => {
   const { menuId, _id, submenu } = req.body;

   try {
      const deleteSubmenu = await Menu.findOneAndUpdate({ _id: menuId }, { $pull: { submenu: { _id } } });
      const { submenu } = deleteSubmenu;
      response(200, `Successfully! Delete Submenu ${submenu[submenu.length - 1].name}`, res, { submenu, menuId, _id, "delete?": "successed" });
   } catch (err) {
      console.log("error: ", err);
   }
};

const updateSubmenu = async (req, res) => {
   const { _id } = req.params;
   const { submenu, menu, icon, link } = req.body;

   try {
      const update = await Menu.findOneAndUpdate({ "submenu._id": _id }, { $set: { "submenu.$.name": submenu, "submenu.$.icon": icon, "submenu.$.link": link } });
      response(200, `Successfully! Update Submenu ${submenu}`, res, update);
   } catch (err) {
      console.log("error: ", err);
   }
};

const checkUserAccess = async (req, res) => {
   const { menu, role } = req.query;

   try {
      const access = await Menu.findOne({ name: menu.toUpperCase(), user_access: role });
      if (access === null) return response(403, `403! Forbidden Access`, res, access);

      return response(200, `Have an Access`, res, access);
   } catch (err) {
      console.log("error: ", err);
   }
};

const editProfileWithoutImage = async (req, res) => {
   const { _id } = req.params;
   const { name, email } = req.body;

   try {
      const edit = await User.findOneAndUpdate({ _id }, { $set: { name, email } });
      userInfo(edit, res);
   } catch (err) {
      console.log("error", err);
   }
};

const editProfileWithImage = async (req, res) => {
   if (req.file === undefined) return response(400, "Invalid Image", res, "Not image type");

   const { filename, size } = req.file;
   const { name, email } = req.body;
   const { _id } = req.params;

   try {
      const { image } = await User.findOne({ _id });
      if (image !== "nophoto.jpg") {
         removeFile(image);
      }
      const edit = await User.findOneAndUpdate({ _id }, { $set: { name, email, image: filename } });
      userInfo(edit, res);
   } catch (err) {
      console.log("editProfile:", err);
   }
};

const userInfo = async ({ _id }, res) => {
   const user = await User.findOne({ _id });
   response(200, "Successfully! Edit Profile", res, user);
};

module.exports = {
   getCartByUserId,
   getUserMenu,
   searchRequest,
   deleteCartByUserId,
   addNewCart,
   addNewMenu,
   deleteMenuById,
   updateSubmenu,
   updateUserMenu,
   addNewSubmenu,
   deleteSubmenuById,
   searchSubmenu,
   checkUserAccess,
   editProfileWithImage,
   editProfileWithoutImage,
};
