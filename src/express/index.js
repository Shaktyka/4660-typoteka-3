'use strict';

const path = require(`path`);
const express = require(`express`);
const loginRouter = require(`./routes/login`);
const registerRouter = require(`./routes/register`);
const articlesRouter = require(`./routes/articles`);
const categoriesRouter = require(`./routes/categories`);
const searchRouter = require(`./routes/search`);
const myRouter = require(`./routes/my`);

const WORK_PORT = 8080;
const STATIC_DIR = path.join(__dirname, `../../markup`);

const app = express();

app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(STATIC_DIR));

app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/articles`, articlesRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/search`, searchRouter);
app.use(`/my`, myRouter);

app.get(`/`, (req, res) => {
  res.render(`./pages/main`);
});

app.listen(WORK_PORT, () =>
  console.log(`Сервер запущен на порту: ${WORK_PORT}`));
