var writtenNumber = require("written-number");

const tranformarNumero = req => {
  const { num1 } = req.params;
  const translatedNumber = writtenNumber(num1, { lang: "es" });
  return `numero: ${translatedNumber}`;
};

module.exports = { tranformarNumero };
