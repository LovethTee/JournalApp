const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const journalsController = require("../controllers/journals");
const editsController = require("../controllers/edits");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Journal Routes 
router.get("/:id", ensureAuth, journalsController.getJournal);
router.get("/edit/:id", ensureAuth, editsController.getEdit);


router.post("/createJournal", upload.single("file"), journalsController.createJournal);

router.put("/likeJournal/:id", journalsController.likeJournal);
router.put("/editJournal/:id", journalsController.editJournal);

router.delete("/deleteJournal/:id", journalsController.deleteJournal);

module.exports = router;
