const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
      trim: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Guest",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

//export task model
module.exports = Note;
