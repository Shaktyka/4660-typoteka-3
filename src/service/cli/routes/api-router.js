'use strict';

const {Router} = require(`express`);
const categoriesRouter = require(`./categories-router`);
const searchRouter = require(`./search-router`);
const articlesRouter = require(`./articles-router`);
const apiRouter = new Router();

apiRouter.use(`/articles`, articlesRouter);
apiRouter.use(`/categories`, categoriesRouter);
apiRouter.use(`/search`, searchRouter);

module.exports = apiRouter;
