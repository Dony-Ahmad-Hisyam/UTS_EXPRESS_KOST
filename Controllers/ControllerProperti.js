const connection = require("../Models/config");
const { validationResult } = require("express-validator");

const getAllPropertiController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }
    connection.query("SELECT * from propertikoskosan", (err, rows) => {
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

const addPropertiController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      Nama: req.body.Nama,
      AlamatProperti: req.body.AlamatProperti,
      jumlahKamar: req.body.jumlahKamar,
      Fasilitas: req.body.Fasilitas,
      InformasiTambahan: req.body.InformasiTambahan,
    };

    connection.query("INSERT INTO propertikoskosan SET ?", data, (err, rows) => {
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

const getByIdPropertiController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }
    const id = req.params.IDProperti;
    connection.query("Select * from propertikoskosan where IDProperti = ?", [id], (err, rows) => {
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

const updatePropertiController = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      Nama: req.body.Nama,
      AlamatProperti: req.body.AlamatProperti,
      jumlahKamar: req.body.jumlahKamar,
      Fasilitas: req.body.Fasilitas,
      InformasiTambahan: req.body.InformasiTambahan,
    };

    const id = req.body.IDProperti;

    connection.query("update propertikoskosan set ? where IDProperti ", [data, id], (err, rows) => {
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

const deletePropertiController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        erros: errors.array(),
      });
    }

    const id = req.params.IDProperti;
    connection.query("delete from propertikoskosan where IDProperti = ?", [id], (err, rows) => {
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
  getAllPropertiController,
  addPropertiController,
  getByIdPropertiController,
  updatePropertiController,
  deletePropertiController,
};
