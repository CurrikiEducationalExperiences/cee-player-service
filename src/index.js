require("dotenv").config();
const path = require("path");
const lti = require("ltijs").Provider;
const Database = require("ltijs-sequelize");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const ltiRoutes = require("./routes/lti");
const { setRouter } = require("./routes/api");
const { globalErrorHandler } = require("./utils/response");

const db = new Database(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

lti.setup(
  process.env.LTI_KEY,
  {
    plugin: db,
  },
  {
    tokenMaxAge: false,
    staticPath: path.join(__dirname, "../public"), // Path to static files
    cookies: {
      secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
      sameSite: "", // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
    },
    devMode: true, // Set DevMode to true if the testing platform is in a different domain and https is not being used
    dynRegRoute: "/register", // Setting up dynamic registration route. Defaults to '/register'
    dynReg: {
      url: process.env.NODE_APP_BASEURL, // Tool Provider URL. Required field.
      name: process.env.TOOL_NAME, // Tool Provider name. Required field.
      logo: process.env.NODE_APP_BASEURL + "icon.svg", // Tool Provider logo URL.
      description: process.env.TOOL_DESCRIPTION, // Tool Provider description.
      redirectUris: [process.env.NODE_APP_BASEURL + "play"], // Additional redirection URLs. The main URL is added by default.
      customParameters: { key: "value" }, // Custom parameters.
      autoActivate: true, // Whether or not dynamically registered Platforms should be automatically activated. Defaults to false.
    },
  }
);

lti.onConnect(async (token, req, res) => {
  return res.sendFile(path.join(__dirname, "../public/index.html"));
});

lti.onDeepLinking(async (token, req, res) => {
  if (req.query.c2eId) {
    return lti.redirect(res, `/play/${req.query.c2eId}`, { newResource: true });
  } else {
    return lti.redirect(res, "/deeplink", { newResource: true });
  }
});

/////////////////// WHITELISTING ROUTES ///////////////////
lti.whitelist(new RegExp(/^\/api\/v1/), {
  route: new RegExp(/^api\/v1/),
  method: "post",
});
lti.whitelist(new RegExp(/^\/api\/v1/), {
  route: new RegExp(/^api\/v1/),
  method: "get",
});
lti.whitelist(new RegExp(/^\/api\/v1/), {
  route: new RegExp(/^api\/v1/),
  method: "patch",
});
lti.whitelist(new RegExp(/^\/api\/v1/), {
  route: new RegExp(/^api\/v1/),
  method: "delete",
});
lti.whitelist(new RegExp(/^\/api-docs/), {
  route: new RegExp(/^api\/v1/),
  method: "get",
});
lti.whitelist(
  { route: "/platform/register", method: "post" },
  { route: "/canvas/config", method: "get" }
);

/////////////////// BODY PARSER ///////////////////
lti.app.use(bodyParser.urlencoded({ extended: false }));

////////////// PARSE application/json /////////////
lti.app.use(
  bodyParser.json({
    limit: `${process.env.BODYPARSER_LIMIT}kb`,
  })
);

////////////////////// CORS //////////////////////
lti.app.use(
  cors({
    maxAge: process.env.CORS_MAX_AGE_SEC,
  })
);

/////////////////// SWAGGER UI ///////////////////
if (process.env.ENV === "development") {
  lti.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

setRouter(lti.app);
lti.app.use(ltiRoutes);

/////// GLOBAL ERROR LANDLER AS MIDDLEWARE //////
lti.app.use((err, req, res, next) => globalErrorHandler(err, req, res, next));

const setup = async () => {
  await lti.deploy({ port: process.env.PORT });
};

setup();

module.exports = { app: lti.app };
