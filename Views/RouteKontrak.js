const express = require("express");
const router = express.Router();
const { getAllkontraksewaController, addkontraksewaController, getByIDKontrakController, updatekontraksewaController, deletekontraksewaController } = require("../Controllers/ControllerKontrak");

router.get("/api/kontraksewa", getAllkontraksewaController);
router.post("/api/kontraksewa/store", addkontraksewaController);
router.get("/api/kontraksewa/:IDKontrak", getByIDKontrakController);
router.put("/api/kontraksewa/update/:IDKontrak", updatekontraksewaController);
router.delete("/api/kontraksewa/delete/:IDKontrak", deletekontraksewaController);

module.exports = router;
