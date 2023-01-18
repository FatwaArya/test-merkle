const express = require("express");
const Admin = require("../model/admin");
const router = express.Router();
const auth = require("../middleware/auth");
const Guest = require("../model/guest");
const Note = require("../model/note");

router.post("/admin/register", async (req, res) => {
  const admin = new Admin(req.body);
  try {
    const token = await admin.generateAuthToken();
    await admin.save();
    res.status(201).send({ admin, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
router.post("/admin/login", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await admin.generateAuthToken();
    res.send({ admin, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
router.post("/admin/logout", auth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.admin.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/admin/entries", auth, async (req, res) => {
  try {
    //show all entries with notes
    const entries = await Note.find({}).populate("guest");
    res.send(entries);
  } catch (e) {
    res.status(500).send();
  }
});
router.delete("/admin/entries/:id", auth, async (req, res) => {
  try {
    //delete note by id and guest by id
    const entry = await Note.findByIdAndDelete(req.params.id);
    await Guest.findByIdAndDelete(entry.guest._id);

    if (!entry) {
      return res.status(404).send();
    }

    res.send("deleted");
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
