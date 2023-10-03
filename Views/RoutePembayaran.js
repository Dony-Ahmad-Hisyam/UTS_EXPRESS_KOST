const express = require("express");
const router = express.Router();
const { getAllPembayaranController, addPembayaranController, getByIdPembayaranController, updatePembayaranController, deletePembayaranController } = require("../Controllers/ControllerPembayaran");

router.get("/api/Pembayaran", getAllPembayaranController);
router.post("/api/Pembayaran/store", addPembayaranController);
router.get("/api/Pembayaran/:IDPembayaran", getByIdPembayaranController);
router.put("/api/Pembayaran/update/:IDPembayaran", updatePembayaranController);
router.delete("/api/Pembayaran/delete/:IDPembayaran", deletePembayaranController);

module.exports = router;
