// GENERALS
const route = require("express").Router();
const material = require("../controllers/material.js");

module.exports = (app) => {
  app.use("/material", route);
  
  route.post("/",material.postMaterial);

  route.get("/", material.getAllMaterial);

  route.get("/:id", material.getOneMaterial);

  route.put("/:id",material.putMaterial);

  route.delete("/:id",material.deleteMaterial);

};