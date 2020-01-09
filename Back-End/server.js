const express = require("express");
const cors = require("cors");
let { HOST, PORT, AMBIENTE } = process.env;

console.log(process.env);

const app = express();

app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      // if(!origin) return callback(null, true);
      // if(allowedOrigins.indexOf(origin) === -1){
      //   const msg = 'The CORS policy for this site does not ' +
      //             'allow access from the specified Origin.';
      //             console.log(msg + " origin:" + origin );
      //   return callback(new Error(msg), false);
      // }
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
  res.send(
    `API construida para Lagash University se encuentra arriba en ambiente ${AMBIENTE ||
      "No definido"}`
  );
});

app.listen((PORT = 5201), (HOST = "0.0.0.0"));
console.log(`Corriendo  API en http://${HOST || "0.0.0.0"}:${PORT || 5200}`);
