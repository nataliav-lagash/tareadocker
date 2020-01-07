
var config = require('./../settings/appsettings.secrets.json');
const { apiUri } = config

const api = {
  getUF: (date)=>`${apiUri}/uf/${date}`,
};

const uriConfig = {
  api,
};

exports.uriConfig = uriConfig;
