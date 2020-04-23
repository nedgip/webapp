if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");

// Express configuration
// Set ejs as the view engine
app.set("view engine", "ejs");
// Set the location of ejs views
app.set("views", __dirname + "/views");
// Set the location of ejs layouts
app.set("layout", "layouts/layout");

// Tell the app that we will use expressLayouts
app.use(expressLayouts);
// Tell the app that we will  store static files such as css and js in public
app.use(express.static("public"));

// Mongodb - Mongoose configuration
const mongoose = require("mongoose");
// Connect to mongodb, we get the database urls from environment variables
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// Tell the app that to use indexRouter which maps to index.js in our routes folder
app.use("/", indexRouter);

// Server listen to production or localhost: 3000
app.listen(process.env.PORT || 3000);
