const checkNodeEnvironment = (productionExpression, developmentExpression) =>
  process.env.NODE_ENV === "production"
    ? productionExpression
    : developmentExpression;

module.exports = checkNodeEnvironment;
