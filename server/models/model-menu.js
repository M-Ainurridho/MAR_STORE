const { default: mongoose, Schema } = require("mongoose");

const MenuSchema = new Schema({
   name: String,
   user_access: [String],
   submenu: [{
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      icon: String,
      link: String,
   },],
});

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
