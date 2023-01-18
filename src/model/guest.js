//make guest schema

const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
guestSchema.virtual("notes", {
  ref: "Note",
  localField: "_id",
  foreignField: "guest",
});

const Guest = mongoose.model("Guest", guestSchema);

//export task model
module.exports = Guest;
