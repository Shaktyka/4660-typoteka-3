'use strict';

const express = require(`express`);

const DEFAULT_PORT = 3000;

const app = express();
const router = express.Router();

app.use(`/posts`, router);
app.use(express.json());

router.use(`/`, (req, res) => {
  res.send(`/posts`);
});

app.listen(DEFAULT_PORT, () =>
  console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
