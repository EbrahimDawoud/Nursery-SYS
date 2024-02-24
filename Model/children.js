const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);


const childrenSchema = new mongoose.Schema({
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
  image: {
      type: String,
      required: [true, "Please upload  your photo"],
    }
});

const Children = mongoose.model("Children", childrenSchema);

module.exports = Children;

