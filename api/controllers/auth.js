const express = require("express");
const { db } = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//Register
const register = (req, res) => {
  //CHECK EXISTS USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    //Check is someting went wrong
    if (err) return res.json(err);
    //Check if user is exists
    if (data.length) {
      return res.status(409).json({ message: "User is already exists!" });
    }
    //Hash password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //Insert User to Database
    const q = "INSERT INTO users(`username`, `email`, `password` ) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      //Check is someting went wrong
      if (err) return res.json(err);
      //If not err
      res.status(200).json({ message: "User has been created successfully." });
    });
  });
};

//Login
const login = (req, res) => {
  //CHECK USER EXIST
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json("User not found!");
    }

    //Check Password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password //password get from db
    );

    // If password not correct
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username or password!");
    }

    //If login success Generate token
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    //Separate Password
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

//Logout
const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

module.exports = { register, login, logout };
