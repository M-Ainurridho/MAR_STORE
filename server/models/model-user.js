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
      default: "member",
   },
   created: {
      type: Date,
      default: Date.now,
   },
   products: [
      {
         _id: mongoose.Schema.Types.ObjectId,
         name: String,
         category: String,
         sub_category: String,
         brand: String,
         images: [String],
         price: Number,
         stock: Number,
         discount: Number,
      },
   ],
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
   payments: [
      {
         _id: mongoose.Schema.Types.ObjectId,
         paymentCode: String,
         paymentStatus: {
            type: Number,
            default: 1,
         },
         receipt: {
            type: String,
            default: "nophoto.jpg",
         },
         items: [],
      },
   ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
