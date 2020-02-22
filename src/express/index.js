'use strict';

const express = require(`express`);

const WORK_PORT = 8080;
const app = express();

app.get(`/`, (req, res) => res.send(`/`));

app.listen(WORK_PORT, () =>
  console.log(`Сервер запущен на порту: ${WORK_PORT}`));
