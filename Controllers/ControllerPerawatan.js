const connection = require("../Models/config");
const { validationResult } = require("express-validator");

const getAllPerawatanController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }
    connection.query("SELECT pk.Nama AS Nama, p.DeskripsiPerawatan, p.BiayaPerawatan, p.TanggalPerawatan, p.StatusPerawatan FROM perawatanproperti p INNER JOIN propertikoskosan pk ON p.IDProperti = pk.IDProperti", (err, rows) => {
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

const addPerawatanController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      IDProperti: req.body.IDProperti,
      DeskripsiPerawatan: req.body.DeskripsiPerawatan,
      BiayaPerawatan: req.body.BiayaPerawatan,
      TanggalPerawatan: req.body.TanggalPerawatan,
      StatusPerawatan: req.body.StatusPerawatan,
    };

    connection.query("INSERT INTO perawatanproperti SET ?", data, (err, rows) => {
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

const getByIdPerawatanController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }
    const id = req.params.IDPerawatan;
    connection.query(
      "SELECT pk.Nama AS Nama, p.DeskripsiPerawatan, p.BiayaPerawatan, p.TanggalPerawatan, p.StatusPerawatan FROM perawatanproperti p INNER JOIN propertikoskosan pk ON p.IDProperti = pk.IDProperti where IDPerawatan = ?",
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

const updatePerawatanController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      IDProperti: req.body.IDProperti,
      DeskripsiPerawatan: req.body.DeskripsiPerawatan,
      BiayaPerawatan: req.body.BiayaPerawatan,
      TanggalPerawatan: req.body.TanggalPerawatan,
      StatusPerawatan: req.body.StatusPerawatan,
    };

    const id = req.body.IDPerawatan;

    connection.query("update perawatanproperti set ? where IDPerawatan ", [data, id], (err, rows) => {
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

const deletePerawatanController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }

    const id = req.params.IDPerawatan;
    connection.query("delete from perawatanproperti where IDPerawatan = ?", [id], (err, rows) => {
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
  getAllPerawatanController,
  addPerawatanController,
  getByIdPerawatanController,
  updatePerawatanController,
  deletePerawatanController,
};
