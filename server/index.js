const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./config/db");
require("dotenv").config();

const port = process.env.SERVER_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
const productRoute = require("./routes/router-product");
const authRoute = require("./routes/router-auth");
const userRoute = require("./routes/router-user");

app.use("/product", productRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(port, () => {
   console.log(`MAR_STORE Listening at http://localhost:${port}`);
});
