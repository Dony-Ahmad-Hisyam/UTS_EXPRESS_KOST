const connection = require("../Models/config");
const { validationResult } = require("express-validator");

const getAllPembayaranController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }
    connection.query("SELECT pk.HargaSewaBulanan AS Harga, p.TanggalPembayaran, p.JumlahPembayaran, p.MetodePembayaran, p.StatusPembayaran FROM pembayaransewa p INNER JOIN kontraksewa pk ON p.IDKontrak = pk.IDKontrak", (err, rows) => {
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
    });
  } catch (error) {
    console.error("Kesalahan Dalam Permintaa:", error);
    return res.status(500).json({
      status: false,
      message: "Kesalahan Dalam Server: " + error.message,
    });
  }
};

const addPembayaranController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      IDKontrak: req.body.IDKontrak,
      TanggalPembayaran: req.body.TanggalPembayaran,
      JumlahPembayaran: req.body.JumlahPembayaran,
      MetodePembayaran: req.body.MetodePembayaran,
      StatusPembayaran: req.body.StatusPembayaran,
    };

    connection.query("INSERT INTO pembayaransewa SET ?", data, (err, rows) => {
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

const getByIdPembayaranController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }
    const id = req.params.IDPembayaran;
    connection.query(
      "SELECT pk.HargaSewaBulanan AS Harga, p.TanggalPembayaran, p.JumlahPembayaran, p.MetodePembayaran, p.StatusPembayaran FROM pembayaransewa p INNER JOIN kontraksewa pk ON p.IDKontrak = pk.IDKontrak where IDPembayaran = ?",
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

const updatePembayaranController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      IDKontrak: req.body.IDKontrak,
      TanggalPembayaran: req.body.TanggalPembayaran,
      JumlahPembayaran: req.body.JumlahPembayaran,
      MetodePembayaran: req.body.MetodePembayaran,
      StatusPembayaran: req.body.StatusPembayaran,
    };

    const id = req.body.IDPembayaran;

    connection.query("update pembayaransewa set ? where IDPembayaran ", [data, id], (err, rows) => {
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

const deletePembayaranController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }

    const id = req.params.IDPembayaran;
    connection.query("delete from pembayaransewa where IDPembayaran = ?", [id], (err, rows) => {
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
  getAllPembayaranController,
  addPembayaranController,
  getByIdPembayaranController,
  updatePembayaranController,
  deletePembayaranController,
};
