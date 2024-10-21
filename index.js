//express
const express = require("express");
require("dotenv").config();

const systemConfix = require("./config/system");

const database = require("./config/database");
//client
const route = require("./routes/client/index.route");
//admin
const routeAdmin = require("./routes/admin/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

//pug
app.set("views", "./views");
app.set("view engine", "pug");

// app locals variables
//app.local : để tạo ra các biến toàn cục
app.locals.prefixAdmin = systemConfix.prefixAdmin;

//cấu hình file tĩnh (để public ra ngoài để ai cx có thể xem được)
app.use(express.static("public"));
//route
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
