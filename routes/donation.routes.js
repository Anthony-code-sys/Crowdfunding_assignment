const express = require("express");

const donationController = require("../controllers/donation.controller");

const donationRouter = express.Router();

donationRouter.post("/", donationController.createDonation);

module.exports = donationRouter;