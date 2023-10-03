const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 2023;

const RouteProperti = require("./Views/RouterProperti");
const RoutePerawatan = require("./Views/RoutePerawatan");
const RoutePenyewa = require("./Views/RoutePenyewa");
const RouteKontrak = require("./Views/RouteKontrak");
const RoutePembayaran = require("./Views/RoutePembayaran");
const RouteCatKeu = require("./Views/RouteCatatanKeungan");
const RoutePengumuman = require("./Views/RoutePengumuman");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(RouteProperti);
app.use(RoutePerawatan);
app.use(RoutePenyewa);
app.use(RouteKontrak);
app.use(RoutePembayaran);
app.use(RouteCatKeu);
app.use(RoutePengumuman);

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
