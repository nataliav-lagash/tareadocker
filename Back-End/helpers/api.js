
var config = require('./../settings/appsettings.secrets.json');
const { apiQRUri } = config

const api = {
  pointOfSales: `${apiQRUri}/pointsOfSales`,
};

const uriConfig = {
  apiQR,
};

exports.uriConfig = uriConfig;
