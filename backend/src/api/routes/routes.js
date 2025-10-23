const express = require("express");
const router = express.Router();
const agenceController = require("../controllers/agence.controller");
const upload = require("../../middleware/upload");

// Upload image
router.post("/upload", upload.single("file"), (req, res) => {
  res.send({ filename: req.file.filename });
});

// Agences
router.post("/agences", upload.single("image"), agenceController.create);
router.get("/agences", agenceController.findAll);
router.get("/agences/:id", agenceController.findOne);
router.put("/agences/:id", upload.single("image"), agenceController.update);

router.delete("/agences/:id", agenceController.delete);

module.exports = router;
