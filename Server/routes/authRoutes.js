const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/authController");

//login api
router.post("/login", login);
//register api
router.post("/register", register);

module.exports = router;
