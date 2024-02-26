const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// Embedded schema for address
const addressScema = new mongoose.Schema({
  city: {
    type: String,
    enum: ["Tanta", "Alex", "Mans"],
    required: [true, "Please tell us your city!"],
  },
  St: String,
  building: String

}, { _id: false })


const childrenSchema = new mongoose.Schema({
  _id : {type: Number, unique:true},
  fullName: { type: String },
  password: { type: String, required: true },
  level: {
    type: String,
    required: [true, "Please provide your level"],
    enum: ["KG", "KG1", "KG2", "KG3"],
  },
  age: {type: Number, required: true},
  profileImage:String,
  assignedClass: {
    type: Number,
    ref: "class",
  },
});

const Children = mongoose.model("children", childrenSchema);

module.exports = Children;

