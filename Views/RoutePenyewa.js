const express = require("express");
const router = express.Router();
const { getAllPenyewaController, addPenyewaController, getByIDPenyewaController, updatePenyewaController, deletePenyewaController } = require("../Controllers/ControllerPenyewa");

router.get("/api/Penyewa", getAllPenyewaController);
router.post("/api/Penyewa/store", addPenyewaController);
router.get("/api/Penyewa/:IDPenyewa", getByIDPenyewaController);
router.put("/api/Penyewa/update/:IDPenyewa", updatePenyewaController);
router.delete("/api/Penyewa/delete/:IDPenyewa", deletePenyewaController);

module.exports = router;
