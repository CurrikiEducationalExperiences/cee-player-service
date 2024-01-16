const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const platformRouter = require('./platform');
const licenseeRouter = require('./licensee');

const setRouter = (app) => {
  app.use('/api/v1', router);
  router.use(`/admin`, adminRouter);
  router.use(`/platform`, platformRouter);
  router.use(`/licensee`, licenseeRouter);
};

module.exports = { setRouter };
