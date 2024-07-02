const checkNodeEnvironment = require("../utils/checkNodeEnvironment");

const origin = checkNodeEnvironment(
  "https://estoes-challenge.up.railway.app/",
  "*"
);

const corsConfig = {
  origin,
  credentials: true,
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
};

module.exports = corsConfig;
