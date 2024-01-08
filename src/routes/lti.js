const express = require("express");
const ltiRouter = express.Router();
const path = require("path");
const validationMiddleware = require("../middleware/validation");
const ltiValidations = require("../validations/lti");
const { ltiController } = require("../controllers/lti");

ltiRouter.post(
  "/grade",
  validationMiddleware(ltiValidations.grade),
  ltiController.grade
);
ltiRouter.get(
  "/members",
  ltiController.members
);
ltiRouter.post(
  "/deeplink",
  validationMiddleware(ltiValidations.deeplink),
  ltiController.deeplink
);
ltiRouter.get(
  "/info",
  ltiController.info
);
ltiRouter.get(
  "/resources",
  validationMiddleware(ltiValidations.resources, (isGet = true)),
  ltiController.resources
);
ltiRouter.get(
  "/stream",
  validationMiddleware(ltiValidations.stream, (isGet = true)),
  ltiController.stream
);
ltiRouter.put(
  "/xapi/statements",
  validationMiddleware(ltiValidations.xapi),
  ltiController.xapi
);
ltiRouter.post(
  "/platform/register",
  validationMiddleware(ltiValidations.registerPlatform),
  ltiController.registerPlatform
);
ltiRouter.get(
  "/canvas/config",
  ltiController.canvasConfigJson
);

ltiRouter.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../public/index.html"))
);

module.exports = ltiRouter;
