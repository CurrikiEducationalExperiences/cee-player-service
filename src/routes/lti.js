const express = require("express");
const ltiRouter = express.Router();
const path = require("path");
const validationMiddleware = require("../middleware/validation");
const ltiValidations = require("../validations/lti");
const { LtiController } = require("../controllers/lti");

ltiRouter.post(
  "/grade",
  validationMiddleware(ltiValidations.grade),
  LtiController.grade
);
ltiRouter.get(
  "/members",
  LtiController.members
);
ltiRouter.post(
  "/deeplink",
  validationMiddleware(ltiValidations.deeplink),
  LtiController.deeplink
);
ltiRouter.get(
  "/info",
  LtiController.info
);
ltiRouter.get(
  "/resources",
  validationMiddleware(ltiValidations.resources, (isGet = true)),
  LtiController.resources
);
ltiRouter.get(
  "/stream",
  validationMiddleware(ltiValidations.stream, (isGet = true)),
  LtiController.stream
);
ltiRouter.put(
  "/xapi/statements",
  validationMiddleware(ltiValidations.xapi),
  LtiController.xapi
);
ltiRouter.post(
  "/platform/register",
  validationMiddleware(ltiValidations.registerPlatform),
  LtiController.registerPlatform
);
ltiRouter.get(
  "/canvas/config",
  LtiController.canvasConfigJson
);

ltiRouter.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../../public/index.html"))
);

module.exports = ltiRouter;
