const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
