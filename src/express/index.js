'use strict';

const path = require(`path`);
const express = require(`express`);

const homeRouter = require(`./routes/home-routes`);
const loginRouter = require(`./routes/login-routes`);
const registerRouter = require(`./routes/register-routes`);
const articlesRouter = require(`./routes/articles-routes`);
const categoriesRouter = require(`./routes/categories-routes`);
const searchRouter = require(`./routes/search-routes`);
const myRouter = require(`./routes/my-routes`);
const STATIC_DIR = path.join(__dirname, `../../markup`);

const WORK_PORT = 8080;
const SERVER_START_MESSAGE = `Сервер запущен на порту:`;

const app = express();

app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(STATIC_DIR));

app.use(`/`, homeRouter);
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/articles`, articlesRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/search`, searchRouter);
app.use(`/my`, myRouter);

app.listen(WORK_PORT, () =>
  console.log(`${SERVER_START_MESSAGE} ${WORK_PORT}`));
