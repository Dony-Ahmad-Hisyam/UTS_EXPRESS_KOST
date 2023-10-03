const express = require("express");
const router = express.Router();
const { getAllPerawatanController, addPerawatanController, getByIdPerawatanController, updatePerawatanController, deletePerawatanController } = require("../Controllers/ControllerPerawatan");

router.get("/api/Perawatan", getAllPerawatanController);
router.post("/api/Perawatan/store", addPerawatanController);
router.get("/api/Perawatan/:IDPerawatan", getByIdPerawatanController);
router.put("/api/Perawatan/update/:IDPerawatan", updatePerawatanController);
router.delete("/api/Perawatan/delete/:IDPerawatan", deletePerawatanController);

module.exports = router;
