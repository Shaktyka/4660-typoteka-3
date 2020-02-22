'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/`, (req, res) => {
  res.send(`/articles`);
});

articlesRouter.get(`/add`, (req, res) => {
  res.send(`/articles/add`);
});

articlesRouter.get(`/:id`, (req, res) => {
  const articlesId = Number.parseInt(req.params.id, 10);
  res.send(`/articles/:id ${articlesId}`);
});

articlesRouter.get(`/edit/:id`, (req, res) => {
  const editId = Number.parseInt(req.params.id, 10);
  res.send(`/articles/edit/:id ${editId}`);
});

articlesRouter.get(`/category/:id`, (req, res) => {
  const categoryId = Number.parseInt(req.params.id, 10);
  res.send(`/articles/category/:id ${categoryId}`);
});

module.exports = articlesRouter;
