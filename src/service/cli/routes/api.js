'use strict';

const {Router} = require(`express`);
const categoriesRouter = require(`./categories`);
// const searchRouter = require(`./search`);
const articlesRouter = require(`./articles`);
const apiRouter = new Router();

apiRouter.use(`/articles`, articlesRouter);
apiRouter.use(`/categories`, categoriesRouter);
// apiRouter.use(`/search`, searchRouter);

module.exports = apiRouter;
