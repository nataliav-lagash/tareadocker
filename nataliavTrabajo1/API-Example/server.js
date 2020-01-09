var config = require("./settings/appsettings.secrets.json");
const api = require("./helpers/api");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const trace = require("./helpers/trace");
var writtenNumber = require("written-number");
var calculateFullAge = require("full-age-calculator");
var qr = require("qr-image");
// Constants
let { allowedOrigins, HOST, PORT } = config;

// App
const app = express();

app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "Origen " + "no permitido.";
        console.log(msg + " origin:" + origin);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.use((req, res, next) => {
  let data = "";
  req.setEncoding("utf8");
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", () => {
    req.body = data;
    next();
  });
});

app.get("/", (req, res) => {
  res.send("API Example para Lagash University esta online.");
});

app.get("/api/example", (req, res) => {
  res.send("API Example para Lagash University esta online.");
});

app.get("/api/example2", async function(req, res) {
  const hoy = new Date();
  let dd = hoy.getDate();
  let mm = hoy.getMonth() + 1;
  const yyyy = hoy.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  const diahoy = `${dd}-${mm}-${yyyy}`;
  trace.trackEvent(`Request a /api/example2 correcta.`);

  const request = await fetch(api.uriConfig.api.getUF(diahoy), {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" }
  }).catch(error => {
    console.log(`error: ${error}`);
    trace.trackException(
      `Error llamando a ${api.uriConfig.api.getUF(diahoy)}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  });

  const response = await request.json();
  const {
    nombre,
    serie: [{ valor }]
  } = response;
  if (response) {
    trace.trackEvent(`Llamada a servicio correcta.`, response);
    res.send(`${nombre}:${valor}`);
    res.end();
  } else {
    trace.trackException(
      `Error llamando a ${api.uriConfig.apiQR.tokens}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  }
});

app.get("/tranformarnumero/:num1", (req, res) => {
  const { num1 } = req.params;
  const translatedNumber = writtenNumber(num1, { lang: "es" });
  res.send(`numero: ${translatedNumber}`);
});

app.get("/api/example/:fechanac", (req, res) => {
  const { fechanac } = req.params;
  const edad = calculateFullAge.getFullAge(fechanac);
  res.send(`edad:${edad.years}`);
});

app.get("/qr", (req, res) => {
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
app.listen(PORT, HOST);
console.log(`Corriendo  API en http://${HOST}:${PORT}`);
