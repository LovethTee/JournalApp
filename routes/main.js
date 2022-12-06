const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const journalsController = require("../controllers/journals");
//const addController = require("../controllers/add");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes 
router.get("/", homeController.getIndex);
//router.get("/add", ensureAuth, journalsController.getAdd);
router.get("/feed", ensureAuth, journalsController.getFeed);
router.get("/profile", ensureAuth, journalsController.getProfile);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
//router.get("/journals/add", ensureAuth, addController.getAdd);


module.exports = router;
