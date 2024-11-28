//express
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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
//method
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));
//Express Flash
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
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
