const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const mongoose = require("mongoose");
const userDetails = require("./src/models/userModel");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  process.env.MONGO_URL
);

//connect mongoose
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`we're connected!`);
});

app.get("/", (req, res) => {
  res.send("social_backend");
});

app.post("/singUp", async (req, res) => {
  // console.log(req.body);
  const silence = new userDetails(req.body);
  silence
    .save()
    .then(() => {
      console.log("ok");
      res.send("ok done");

    })
    .catch((e) => {
      console.log("error", e);
      res.send("error --> " + e);

    });
});
app.post("/singIn", async (req, res) => {
  // console.log(userDataGet);
  let isvalid = false;
  try {
    const userDataGet = await userDetails.findOne({
      userName: req.body.userName,
    });
    isvalid = await bcrypt.compare(req.body.password, userDataGet.password);
  } catch (error) {
    console.log(error);
  } finally {
    console.log(isvalid);
  }

  res.send("hello");
});
app.get("/datas", (req, res) => {
  userDetails.find().then((ee) => {
    // console.log(ee);
     res.send(ee);
  });
 
});
app.listen(process.env.PORT, () => {
  console.log("connected express..");
});
