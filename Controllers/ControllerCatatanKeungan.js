const connection = require("../Models/config");
const { validationResult } = require("express-validator");

const getAllcatatankeuanganController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }
    connection.query("SELECT * from catatankeuangan", (err, rows) => {
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

const addcatatankeuanganController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      DeskripsiCatatan: req.body.DeskripsiCatatan,
      TanggalCatatan: req.body.TanggalCatatan,
      JumlahTransaksi: req.body.JumlahTransaksi,
      Kategori: req.body.Kategori,
    };

    connection.query("INSERT INTO catatankeuangan SET ?", data, (err, rows) => {
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

const getByIdcatatankeuanganController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }
    const id = req.params.IDCatatanKeuangan;
    connection.query("SELECT * from catatankeuangan where IDCatatanKeuangan = ?", [id], (err, rows) => {
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
    });
  } catch (error) {
    console.error("Kesalahan Dalam Permintaa:", error);
    return res.status(500).json({
      status: false,
      message: "Kesalahan Dalam Server: " + error.message,
    });
  }
};

const updatecatatankeuanganController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      DeskripsiCatatan: req.body.DeskripsiCatatan,
      TanggalCatatan: req.body.TanggalCatatan,
      JumlahTransaksi: req.body.JumlahTransaksi,
      Kategori: req.body.Kategori,
    };

    const id = req.body.IDCatatanKeuangan;

    connection.query("update catatankeuangan set ? where IDCatatanKeuangan ", [data, id], (err, rows) => {
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

const deletecatatankeuanganController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }

    const id = req.params.IDCatatanKeuangan;
    connection.query("delete from catatankeuangan where IDCatatanKeuangan = ?", [id], (err, rows) => {
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
  getAllcatatankeuanganController,
  addcatatankeuanganController,
  getByIdcatatankeuanganController,
  updatecatatankeuanganController,
  deletecatatankeuanganController,
};
