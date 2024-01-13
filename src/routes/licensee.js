const express = require("express");
const licenseeRouter = express.Router();
const { LicenseeController } = require("../controllers/licensee");
const validationMiddleware = require("../middleware/validation");
const licenseeValidations = require("../validations/licensee");
const { authMiddleware } = require("../middleware/auth");

licenseeRouter.post("/addLicensee", validationMiddleware(licenseeValidations.addLicensee), authMiddleware, LicenseeController.addLicensee);
licenseeRouter.get("/getLicensees", authMiddleware, LicenseeController.getLicensees);
licenseeRouter.put("/updateLicensee", validationMiddleware(licenseeValidations.updateLicensee), authMiddleware, LicenseeController.updateLicensee);
licenseeRouter.delete("/deleteLicensee", validationMiddleware(licenseeValidations.deleteLicensee, (isGet = true)), authMiddleware, LicenseeController.deleteLicensee);

module.exports = adminRouter;
