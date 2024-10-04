//express
const express = require("express");
require("dotenv").config();

const route = require("./routes/client/index.route");

const app = express();
const port = process.env.PORT;

//pug
app.set("views", "./views");
app.set("view engine", "pug");
//cấu hình file tĩnh (để public ra ngoài để ai cx có thể xem được)
app.use(express.static("public"));
//route
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
