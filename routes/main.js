const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const journalsController = require("../controllers/journals");
const editsController = require("../controllers/edits");
const aboutController = require('../controllers/about')



const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes 
router.get("/", homeController.getIndex);
router.get("/feed", ensureAuth, journalsController.getFeed);
router.get("/edit/:id", ensureAuth, journalsController.getEdit);
router.get("/profile", ensureAuth, journalsController.getProfile);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get('/about', aboutController.getAbout)



module.exports = router;
