const app =require('./app')
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running at port: ${PORT}`)
);
