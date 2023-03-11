require('dotenv').config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./server/api/users/user.router")
const app = express();
const mysql = require("mysql");
const pool = require('./server/config/database');

const port = process.env.PORT;
app.use(cors());
app.use(express.urlencoded({ extened: true }));
app.use(express.json());
app.use("api/users", userRouter)

app.listen(port,() => console.log(`listing at http://localhost:${port}`))