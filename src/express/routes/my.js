'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  res.render(`../templates/pages/my`);
});

myRouter.get(`/comments`, (req, res) => {
  res.render(`../templates/pages/comments`);
});

module.exports = myRouter;
