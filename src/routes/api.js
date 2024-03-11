const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const platformRouter = require('./platform');
const licenseeRouter = require('./licensee');
const { StreamController } = require("../controllers/stream");

const setRouter = (app) => {
  app.use('/api/v1', router);
  router.get('/stream/token', StreamController.getToken);
  router.get('/stream/manifest', StreamController.getManifest);
  router.get('/stream/search', StreamController.search);
  router.post('/stream/xapi', StreamController.sendXAPI);

  router.use(`/admin`, adminRouter);
  router.use(`/platform`, platformRouter);
  router.use(`/licensee`, licenseeRouter);
};

module.exports = { setRouter };