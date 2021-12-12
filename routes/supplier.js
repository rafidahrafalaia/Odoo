// GENERALS
const route = require("express").Router();
const supplier = require("../controllers/supplier.js");

module.exports = (app) => {
  app.use('/supplier', route);
  
  route.get("/", supplier.getAllSupplier);

};