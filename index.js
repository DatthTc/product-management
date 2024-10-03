//express
const express = require("express");
const app = express();
const port = 3000;

const route = require("./routes/client/index.route");

//pug
app.set("views", "./views");
app.set("view engine", "pug");
//
app.use(express.static("public"));
//route
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
