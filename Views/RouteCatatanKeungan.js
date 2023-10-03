const express = require("express");
const router = express.Router();
const { getAllcatatankeuanganController, addcatatankeuanganController, getByIdcatatankeuanganController, updatecatatankeuanganController, deletecatatankeuanganController } = require("../Controllers/ControllerCatatanKeungan");

router.get("/api/catatankeuangan", getAllcatatankeuanganController);
router.post("/api/catatankeuangan/store", addcatatankeuanganController);
router.get("/api/catatankeuangan/:IDCatatanKeuangan", getByIdcatatankeuanganController);
router.put("/api/catatankeuangan/update/:IDCatatanKeuangan", updatecatatankeuanganController);
router.delete("/api/catatankeuangan/delete/:IDCatatanKeuangan", deletecatatankeuanganController);

module.exports = router;
