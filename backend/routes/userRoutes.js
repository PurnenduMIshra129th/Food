const express = require("express");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const { isAuth, isAdmin, generateToken,baseUrl } = require("../utils.js");

const userRouter = express.Router();

//get all Users by admin
userRouter.get(
  "/getUsers",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);
//get a particular user
userRouter.get(
  "/getUser/:id",
  isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: "User Not Found" });
      }
    } catch (err) {
      // Handle database query errors
      console.error(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);
userRouter.put(
  "/updateProfile/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.hostel = req.body.hostel || user.hostel;
      user.regNo = req.body.regNo || user.regNo;
      user.roomNO = req.body.roomNO || user.roomNO;
      user.mobileNO = req.body.mobileNO || user.mobileNO;
    
     const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        hostel: updatedUser.hostel,
        regNo: updatedUser.regNo,
        roomNO: updatedUser.roomNO,
        mobileNO: updatedUser.mobileNO,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);
//update a paricular user by admin
userRouter.put(
  "/updateUser/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
//delete a particular user by admin
userRouter.delete(
  "/deleteUser/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@gmail.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      await user.deleteOne();
      res.send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

//new user
userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      hostel: req.body.hostel,
      regNo: req.body.regNo,
      roomNO: req.body.roomNO,
      mobileNO: req.body.mobileNO,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      hostel: user.hostel,
      regNo: user.regNo,
      roomNO: user.roomNO,
      mobileNO: user.mobileNO,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);
//existing user
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          hostel: user.hostel,
          regNo: user.regNo,
          roomNO: user.roomNO,
          mobileNO: user.mobileNO,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
module.exports = userRouter;
