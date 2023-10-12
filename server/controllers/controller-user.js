const { response } = require("../response");
const User = require("../models/model-user");
const Menu = require("../models/model-menu");

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

module.exports = {
   getCartByUserId,
   getUserMenu,
   searchRequest,
   deleteCartByUserId,
   addNewCart,
   addNewMenu,
   deleteMenuById,
   updateUserMenu,
};
