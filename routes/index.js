const { Router } = require("express");

// ROUTES
const material = require("./material");
const supplier = require("./supplier");
const type = require("./type");

module.exports = () => {
  const app = Router();

  material(app);
  supplier(app);
  type(app);

  return app;
};