const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { UserRouter } = require("./routes/authRoutes");
const { connection } = require("./db");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "welcome to job finder app" });
  } catch (error) {
    console.error(error);
  }
});

app.use("/user", UserRouter);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`listening on ${process.env.PORT}`);
});
