const express = require("express");

const fundraiserController = require("../controllers/fundraiser.controller");

const fundraiserRouter = express.Router();

fundraiserRouter.post("/", fundraiserController.createFundraiser);
fundraiserRouter.get("/", fundraiserController.getFundraisers);
fundraiserRouter.get("/:id", fundraiserController.getFundraiserDetail);
fundraiserRouter.put("/:id", fundraiserController.updateFundraiser);
fundraiserRouter.delete("/:id", fundraiserController.deleteFundraiser);


module.exports = fundraiserRouter;