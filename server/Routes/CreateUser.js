const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require('bcryptjs')
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = 'React'
router.post(
  "/createUser",
  body("name", "Name should have more than 1 character").isLength({ min: 2 }),
  body("email", "Invalid EMAIL").isEmail(),
  body("password", "Invalid PASSWORD").isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ error: "User already exists" });
      }

      // If email doesn't exist, proceed to create the new user
      let password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(password, salt);

      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      });
      res.json({ success: true });
    } 
    catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  }
);


router.post(
    "/loginUser",
    body("email", "Invalid EMAIL").isEmail(),
    body("password", "Invalid PASSWORD").isLength({ min: 3 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let email = req.body.email;
      let password = req.body.password;
      try {
        let userData = await User.findOne({ email });
        if (!userData) {
          return res.status(400).json({ errors: "User not Found :(" });
        }

        const pwdCompare = await bcrypt.compare(password,userData.password)
        if (!pwdCompare) {
          return res.status(400).json({ errors: "Invalid Password :(" });
        }

        const data = {
          user:{
            id:userData.id
          }
        }
        const authToken = jwt.sign(data,JWT_SECRET_KEY)
        res.json({ success: true, authToken:authToken });
      } catch (err) {
        console.log(err);
        res.json({ success: false });
      }
    }
  );
  

module.exports = router;

// if sending json data through req body then
// Add this header
// Content-Type: application/json
