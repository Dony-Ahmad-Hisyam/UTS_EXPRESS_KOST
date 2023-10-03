const express = require("express");
const router = express.Router();
const { getAllpengumumanController, addpengumumanController, getByIdpengumumanController, updatepengumumanController, deletepengumumanController } = require("../Controllers/ControllerPengumuman");

router.get("/api/pengumuman", getAllpengumumanController);
router.post("/api/pengumuman/store", addpengumumanController);
router.get("/api/pengumuman/:IDPengumuman", getByIdpengumumanController);
router.put("/api/pengumuman/update/:IDPengumuman", updatepengumumanController);
router.delete("/api/pengumuman/delete/:IDPengumuman", deletepengumumanController);

module.exports = router;
