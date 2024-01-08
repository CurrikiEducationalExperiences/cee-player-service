const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');

const setRouter = (app) => {
  app.use('/api/v1', router);
  router.use(`/admin`, adminRouter);
};

module.exports = { setRouter };
