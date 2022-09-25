const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyparser = require("body-parser");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://wilson:i1Q5lY73KYEWado7@cluster0.hivq2lf.mongodb.net/mern-crud?retryWrites=true&w=majority"
);

app.use(bodyparser.json());
app.use(cors());

app.use("/posts", require("./routes/post"));

app.get("/", (req, res) => {
  res.send({ Project: "MERN CRUD" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
