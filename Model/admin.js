const mongoose = require("mongoose");
// Embedded schema for address
const addressScema = new mongoose.Schema({
  city: {
    type: String,
    enum: ["Tanta", "Alex", "Mans"],
    required: [true, "Please tell us your city!"],
  },
  phone: String,

}, { _id: false })

const adminSchema = new mongoose.Schema({
  _id: Number,
  username: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  age: Number,
  address: addressScema,
  profileImage: {
    type: String,
   // requird: [true, "Please upload  your photo"]
    //default: "default.jpg",
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
