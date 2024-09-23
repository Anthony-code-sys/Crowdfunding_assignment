const express = require("express");

const fundraiserController = require("../controllers/fundraiser.controller");

const fundraiserRouter = express.Router();

fundraiserRouter.get("/", fundraiserController.getFundraisers);
fundraiserRouter.get("/:id", fundraiserController.getFundraiserDetail);

module.exports = fundraiserRouter;