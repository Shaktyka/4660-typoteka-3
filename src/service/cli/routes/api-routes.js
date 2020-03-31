'use strict';

const {Router} = require(`express`);
const categoriesRouter = require(`./categories-routes`);
// const searchRouter = require(`./search-routes`);
const articlesRouter = require(`./articles-routes`);
const apiRouter = new Router();

apiRouter.use(`/articles`, articlesRouter);
apiRouter.use(`/categories`, categoriesRouter);
// apiRouter.use(`/search`, searchRouter);

module.exports = apiRouter;
