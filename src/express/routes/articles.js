'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => {
  res.render(`../templates/pages/new-post`);
});

articlesRouter.get(`/:id`, (req, res) => {
  res.render(`../templates/pages/post`);
});

articlesRouter.get(`/edit/:id`, (req, res) => {
  res.render(`../templates/pages/post`);
});

articlesRouter.get(`/category/:id`, (req, res) => {
  res.render(`../templates/pages/articles-by-category`);
});

module.exports = articlesRouter;
