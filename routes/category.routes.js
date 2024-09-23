const express = require("express");

const categoryController = require("../controllers/category.controller");

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getCategories);

module.exports = categoryRouter;