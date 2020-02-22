'use strict';

const express = require(`express`);
const registerRouter = require(`./routes/register`);
const loginRouter = require(`./routes/login`);
const articlesRouter = require(`./routes/articles`);
const categoriesRouter = require(`./routes/categories`);
const searchRouter = require(`./routes/search`);
const myRouter = require(`./routes/my`);

const WORK_PORT = 8080;
const app = express();

app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/articles`, articlesRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/search`, searchRouter);
app.use(`/my`, myRouter);

app.get(`/`, (req, res) => res.send(`/`));

app.listen(WORK_PORT, () =>
  console.log(`Сервер запущен на порту: ${WORK_PORT}`));
