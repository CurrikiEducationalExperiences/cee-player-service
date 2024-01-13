const express = require("express");
const platformRouter = express.Router();
const { PlatformController } = require("../controllers/platform");
const validationMiddleware = require("../middleware/validation");
const platformValidations = require("../validations/platform");
const { authMiddleware } = require("../middleware/auth");

platformRouter.post("/registerPlatform", validationMiddleware(platformValidations.registerPlatform), authMiddleware, PlatformController.registerPlatform);
platformRouter.get("/getPlatforms", authMiddleware, PlatformController.getPlatform);
platformRouter.delete("/deletePlatform", validationMiddleware(platformValidations.deletePlatform, (isGet = true)), authMiddleware, PlatformController.deletePlatform);

module.exports = platformRouter;
