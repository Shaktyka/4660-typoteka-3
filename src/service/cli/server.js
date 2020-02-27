'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const MOCKS_FILE = `./mocks.json`;
const NOT_FOUND_MESSAGE = `Not found`;

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401
};

const app = express();
const router = express.Router();

app.use(express.json());
app.use(`/posts`, router);

router.use(`/`, (req, res) => {
  res.send(`/posts`);
});

module.exports = {
  name: `--server`,
  run(args) {
    const port = Number.parseInt(args, 10) || DEFAULT_PORT;

    app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));
  }
};