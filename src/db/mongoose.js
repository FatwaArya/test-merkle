const mongoose = require("mongoose");
//use then
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/guest");
