const express = require("express");
const router = express.Router();
const { getAllPropertiController, addPropertiController, getByIdPropertiController, updatePropertiController, deletePropertiController } = require("../Controllers/ControllerProperti");

router.get("/api/Properti", getAllPropertiController);
router.post("/api/Properti/store", addPropertiController);
router.get("/api/Properti/:IDProperti", getByIdPropertiController);
router.put("/api/Properti/update/:IDProperti", updatePropertiController);
router.delete("/api/Properti/delete/:IDProperti", deletePropertiController);

module.exports = router;
