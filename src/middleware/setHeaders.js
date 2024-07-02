const checkNodeEnvironment = require("../utils/checkNodeEnvironment");

const origin = checkNodeEnvironment(
  "https://estoes-challenge.up.railway.app/",
  "http://localhost:3000"
);

const setHeaders = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", origin);

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};

module.exports = setHeaders;
