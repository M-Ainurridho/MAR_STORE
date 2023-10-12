const { default: mongoose, Schema } = require("mongoose");

const UserSchema = new Schema({
   name: String,
   email: {
      type: String,
      unique: true,
   },
   password: String,
   image: {
      type: String,
      default: "nophoto.jpg",
   },
   role: {
      type: String,
      default: "Member",
   },
   created: {
      type: Date,
      default: Date.now,
   },
   carts: [
      {
         _id: mongoose.Schema.Types.ObjectId,
         name: String,
         brand: String,
         image: [],
         price: Number,
         quantity: Number,
         discount: Number,
      },
   ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
