const express = require("express");
const router = express.Router();
const Note = require("../model/note");
const Guest = require("../model/guest");

//guest can put their name, address, phone and note

router.post("/note", async (req, res) => {
  try {
    //destructure the request body
    const { name, address, phone, msg } = req.body;
    const guest = new Guest({
      name,
      address,
      phone,
    });
    const note = new Note({
      msg,

      guest: guest._id,
    });
    await guest.save();
    await note.save();
    res.status(201).send({ note, guest });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
// guest can see what other guests have wrote. guest can see their name & note.
router.get("/note", async (req, res) => {
  try {
    const notes = await Note.find({}).populate("guest", "-address -phone");

    res.send(notes);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
