//setup for express
const express = require("express");
const app = express();
const adminRouter = require("./routers/admin");
const noteRouter = require("./routers/note");
require("./db/mongoose");

//port
const port = process.env.PORT; //parse express json
app.use(express.json());
app.use(adminRouter);
app.use(noteRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
