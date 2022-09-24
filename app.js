const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDatabase = require("./config/database");
const fileUpload = require("express-fileupload");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });

connectDatabase();

const books = require("./routes/books");
const userRouter = require("./routes/userRoutes"); //

const app = express();

if (process.env.NODE_ENV != "production") {
  app.use(morgan("dev"));
}
app.use(cors())
app.use(express.json());
app.use(fileUpload());
app.use(express.static("uploads"));
app.use("/api/v1/books", books);
app.use("/users", userRouter);
//Middleware
app.use((req,res,next)=>{
  console.log("HTTP Method - " + req.method + ", URL- "+req.url);
  next();
});


module.exports= app;