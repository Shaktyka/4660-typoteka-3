'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => {
  res.render(`pages/new-post`);
});

articlesRouter.get(`/:id`, (req, res) => {
  res.render(`pages/post`);
});

articlesRouter.get(`/edit/:id`, (req, res) => {
  res.render(`pages/edit-post`);
});

articlesRouter.get(`/category/:id`, (req, res) => {
  res.render(`pages/articles-by-category`);
});

module.exports = articlesRouter;
