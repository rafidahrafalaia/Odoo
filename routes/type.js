// GENERALS
const route = require("express").Router();
const type = require("../controllers/type.js");

module.exports = (app) => {
  app.use('/type', route);
  
  route.get("/", type.getAllType);

};