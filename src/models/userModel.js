const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// define schema for store data
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  adderss: {
    type: String,
    required: true,
  },
  dateOfBirth: { type: Date, required: true },
  gender: {
    type: String,
    required: true,
  },
  universityName: {
    type: String,
    required: true,
  },
  universityRollNo: {
    type: String,
    required: true,
  },
  universityReg: {
    type: String,
    required: true,
  },
  courceName: {
    type: String,
    required: true,
  },
  semister: {
    type: Number,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  bio: String,
  skills: String,
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 13);
  this.password = hashedPassword;

  next();
});

//compiling schema into a Model.
const userDetails = mongoose.model("listingsAndReviews", userSchema);

module.exports = userDetails;
