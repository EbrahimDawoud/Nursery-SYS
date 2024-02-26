const mongoose = require("mongoose")

const teacherSchema = mongoose.Schema({
  username: {type:String},
  password: {type:String, required: true},
  age: Number,
  email: {type:String, required: true},
  profileImage: String,
  //department: { type: Number, ref: "department" },

})

module.exports = mongoose.model("TeachersV1", teacherSchema);
