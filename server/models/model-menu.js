const { default: mongoose, Schema } = require("mongoose");

const MenuSchema = new Schema({
   name: String,
   user_access: [String],
   submenu: [Object],
});

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
