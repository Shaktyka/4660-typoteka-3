'use strict';

const {Router} = require(`express`);
const categoriesRouter = new Router();

categoriesRouter.get(`/`, (req, res) => {
  res.send(`../templates/pages/all-categories`);
});

module.exports = categoriesRouter;
