const connection = require("../Models/config");
const { validationResult } = require("express-validator");

const getAllkontraksewaController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }
    connection.query(
      "SELECT pk.Nama AS Nama_Kost, pk2.NamaPenyewa AS Nama_Penyewa, p.TanggalMulai, p.TanggalBerakhir, p.HargaSewaBulanan, p.StatusKontrak FROM kontraksewa p INNER JOIN propertikoskosan pk ON p.IDProperti = pk.IDProperti INNER JOIN penyewa pk2 ON p.IDPenyewa = pk2.IDPenyewa",
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server Error!",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Sukses ...!",
            data: rows,
          });
        }
      }
    );
  } catch (error) {
    console.error("Kesalahan Dalam Permintaa:", error);
    return res.status(500).json({
      status: false,
      message: "Kesalahan Dalam Server: " + error.message,
    });
  }
};

const addkontraksewaController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      IDProperti: req.body.IDProperti,
      IDPenyewa: req.body.IDPenyewa,
      TanggalMulai: req.body.TanggalMulai,
      TanggalBerakhir: req.body.TanggalBerakhir,
      HargaSewaBulanan: req.body.HargaSewaBulanan,
      StatusKontrak: req.body.StatusKontrak,
    };

    connection.query("INSERT INTO kontraksewa SET ?", data, (err, rows) => {
      if (err) {
        console.error("Kesalahan dalam permintaan:", err);
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Sukses..!",
          data: rows[0],
        });
      }
    });
  } catch (error) {
    console.error("Kesalahan dalam permintaan:", error);
    return res.status(500).json({
      status: false,
      message: "Kesalahan dalam server: " + error.message,
    });
  }
};

const getByIDKontrakController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }
    const id = req.params.IDKontrak;
    connection.query(
      "SELECT pk.Nama AS Nama_Kost, pk2.NamaPenyewa AS Nama_Penyewa, p.TanggalMulai, p.TanggalBerakhir, p.HargaSewaBulanan, p.StatusKontrak FROM kontraksewa p INNER JOIN propertikoskosan pk ON p.IDProperti = pk.IDProperti INNER JOIN penyewa pk2 ON p.IDPenyewa = pk2.IDPenyewa where IDKontrak = ?",
      [id],
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server Error",
          });
        } else {
          if (rows.length === 0) {
            return res.status(404).json({
              status: false,
              message: "Data not found",
            });
          } else {
            return res.status(200).json({
              status: true,
              message: "Sukses..!",
              data: rows[0],
            });
          }
        }
      }
    );
  } catch (error) {
    console.error("Kesalahan Dalam Permintaa:", error);
    return res.status(500).json({
      status: false,
      message: "Kesalahan Dalam Server: " + error.message,
    });
  }
};

const updatekontraksewaController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      IDProperti: req.body.IDProperti,
      IDPenyewa: req.body.IDPenyewa,
      TanggalMulai: req.body.TanggalMulai,
      TanggalBerakhir: req.body.TanggalBerakhir,
      HargaSewaBulanan: req.body.HargaSewaBulanan,
      StatusKontrak: req.body.StatusKontrak,
    };
    const id = req.body.IDKontrak;

    connection.query("update kontraksewa set ? where IDKontrak ", [data, id], (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Sukses..!",
          data: rows[0],
        });
      }
    });
  } catch (error) {
    console.error("Kesalahan Dalam Permintaa:", error);
    return res.status(500).json({
      status: false,
      message: "Kesalahan Dalam Server: " + error.message,
    });
  }
};

const deletekontraksewaController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }

    const id = req.params.IDKontrak;
    connection.query("delete from kontraksewa where IDKontrak = ?", [id], (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data deleted successfully",
        });
      }
    });
  } catch (error) {
    console.error("Kesalahan Dalam Permintaa:", error);
    return res.status(500).json({
      status: false,
      message: "Kesalahan Dalam Server: " + error.message,
    });
  }
};

module.exports = {
  getAllkontraksewaController,
  addkontraksewaController,
  getByIDKontrakController,
  updatekontraksewaController,
  deletekontraksewaController,
};
