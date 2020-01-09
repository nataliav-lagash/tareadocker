var config = require("./../settings/appsettings.secrets.json");
const trace = require("../helpers/trace");
const fetch = require("node-fetch");
const { apiUri } = config;

const api = {
  getUF: date => `${apiUri}/uf/${date}`
};

const uriConfig = {
  api
};

const obtenerUf = async () => {
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

  const request = await fetch(uriConfig.api.getUF(diahoy), {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" }
  }).catch(error => {
    console.log(`error: ${error}`);
    trace.trackException(
      `Error llamando a ${uriConfig.api.getUF(diahoy)}. Error: ${error}`
    );
  });

  const response = await request.json();
  const {
    nombre,
    serie: [{ valor }]
  } = response;
  if (response) {
    return `${nombre}:${valor}`;
  } else {
    return "ERROR!";
  }
};

module.exports = { obtenerUf };
