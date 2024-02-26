const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// create class a schema
const Schema = new mongoose.Schema({
    _id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeachersV1",
    },
    children: {
        type: [Number],
        ref: "children",
    }
}, { _id: false });

// auto increment
Schema.plugin(AutoIncrement, { id: "classId", inc_field: "_id" });

const _class = mongoose.model("class", Schema);

module.exports = _class;