const models = require("../models");
const uuid = require("uuid");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;
const logger = require("../loaders/logger");
const { query, body, validationResult, param } = require("express-validator");
// SERVICE
const Material = require("../services/Material");
const { mysqlDate } = require("../utils");

const customValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      param: error.param,
      value: error.value,
      location: error.location,
      message: error.msg,
    };
  },
});

// // Retrieve all Material from the database.
exports.getAllMaterial = async (req, res) => {
  await query("page")
    .optional()
    .not()
    .matches(/[!@#\$%\^\&*\)\(+=]+/, "g")
    .withMessage("Must not contain special character")
    .run(req);
  await query("search")
    .optional()
    .isString()
    .withMessage("search must be in string")
    .run(req);
  await query("type")
    .optional()
    .isString()
    .withMessage("type must be in string")
    .run(req);
  
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let {page, search, type} = req.query;
  if(!page)
    page = 1;
  try{
    const result = await Material.findAll(page, search, type);
    res.status(200).send(result);
  }catch (err) {
      logger.error("🔥 error: %o", err);
      throw new Error(err);
  }
}

// // Find a single Material with an id
exports.getOneMaterial = async (req, res) => {
  await param("id").not().isEmpty().withMessage("Must provide an id").isUUID().withMessage("Must provide an UUID V1 format").run(req);
  
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id=req.params.id;
  try{
    const result = await Material.findById(id);
    if(result)
      res.status(200).send(result);
    else
      res.status(404).send({message:"material is not found"});
  }catch (err) {
    logger.error("🔥 error: %o", err.stack);
    throw new Error(err);
  }
};

 // Create and Save a new Material
exports.postMaterial = async (req, res) => {
  await body("name").not().isEmpty().withMessage("Must provide a name for material").isString().withMessage("Must provide a String format").run(req);
  await body("code").not().isEmpty().withMessage("Must provide a code for material").isString().withMessage("Must provide a String format").run(req);
  await body("type").not().isEmpty().withMessage("Must provide a type id for material").isUUID().withMessage("Must provide an UUID V1 format").run(req);
  await body("supplier").not().isEmpty().withMessage("Must provide a supplier id for material").isUUID().withMessage("Must provide an UUID V1 format").run(req);
  await body("buy_price").not().isEmpty().withMessage("Must provide a buy price for material").isFloat({min:100}).withMessage("Must provide a number with minimum: 100").run(req);

  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {name, code, type, supplier, buy_price} = req.body;
  try{
    const material = {
      name,
      code,
      type_id: type,
      supplier_id: supplier,
      buy_price,
      created_date: mysqlDate()
    };
    const result = await Material.create(material);
    if(result)
      res.status(200).send(result);
    else
      res.status(500).send({message: "server error"});
  }catch (err) {
    logger.error("🔥 error: %o", err);
    throw new Error(err);
  }
};

// Update a Material by the id in the request
exports.putMaterial = async (req, res) => {
  await param("id").not().isEmpty().withMessage("Must provide a type id for material").isUUID().withMessage("Must provide an UUID V1 format").run(req);
  await body("name").not().isEmpty().withMessage("Must provide a name for material").isString().withMessage("Must provide a String format").run(req);
  await body("code").not().isEmpty().withMessage("Must provide a code for material").isString().withMessage("Must provide a String format").run(req);
  await body("type").not().isEmpty().withMessage("Must provide a type id for material").isUUID().withMessage("Must provide an UUID V1 format").run(req);
  await body("supplier").not().isEmpty().withMessage("Must provide a supplier id for material").isUUID().withMessage("Must provide an UUID V1 format").run(req);
  await body("buy_price").not().isEmpty().withMessage("Must provide a buy price for material").isNumeric({ min: 100 }).run(req);

  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id;
  const {name, code, type, supplier, buy_price} = req.body;
  try{
    const material = {
      name,
      code,
      type: type,
      supplier: supplier,
      buy_price,
      updated_date: mysqlDate()
    };
    // console.log(id,material);
    const result = await Material.updateById(id, material);
    if(result)
      res.status(200).send(result);
    else
      res.status(500).send({message: "server error"});
  }catch (err) {
    logger.error("🔥 error: %o", err);
    throw new Error(err);
  }
};


// Delete a Material with the specified id in the request
exports.deleteMaterial = async (req, res) => {
  await param("id").not().isEmpty().withMessage("Must provide an id").isUUID().withMessage("Must provide an UUID V1 format").run(req);
  const errors = customValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id;
  try{
    const result = await Material.deleteById(id);
    if(result)
      res.status(200).send({message: "material is deleted successfully"});
    else
      res.status(500).send({message: "server error"});
  }catch (err) {
    logger.error("🔥 error: %o", err);
    throw new Error(err);
  }
}
