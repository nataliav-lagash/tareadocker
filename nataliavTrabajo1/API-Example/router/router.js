const express = require("express");
const trace = require("../helpers/trace");
const api = require("../helpers/api");
const fetch = require("node-fetch");
var writtenNumber = require("written-number");
var calculateFullAge = require("full-age-calculator");
const { obtenerUf } = require("../helpers/api");
const { tranformarNumero } = require("../helpers/tranformarNumero");
var qr = require("qr-image");

const router = express.Router();

router.get("/getUf", async (req, res) => {
  res.send(await obtenerUf());
});

router.get("/tranformarNumero/:num1", (req, res) => {
  res.send(tranformarNumero(req));
});

router.get("/edad/:fechanac", (req, res) => {
  const { fechanac } = req.params;
  const edad = calculateFullAge.getFullAge(fechanac);
  res.send(`edad:${edad.years}`);
});

router.get("/qr", (req, res) => {
  const url = "http://91dad76a.ngrok.io";
  var code = qr.image(url, {
    type: "png",
    ec_level: "H",
    size: 10,
    margin: 0
  });
  res.setHeader("Content-type", "image/png");
  code.pipe(res);
});

module.exports = router;
