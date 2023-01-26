import mongoose from "mongoose";

//This is Main User Schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 25,
    minlength: 2,
    required: false,
  },
  lastname: {
    type: String,
    maxlength: 25,
    minlength: 2,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  otp:{
    type:Number,
    required:false,
  }

 
});

const userModel = new mongoose.model("Users", userSchema, "users");

export default userModel;
