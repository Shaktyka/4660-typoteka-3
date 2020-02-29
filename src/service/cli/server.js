'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const PORT = 3000;
const MOCKS_FILE = `mocks.json`;

const ServerMessage = {
  ERROR: `Ошибка при создании сервера`,
  CONNECT: `Ожидаю соединений на порту`,
  FILE_NOT_FOUND: `Файл ${MOCKS_FILE} не найден`,
  EMPTY_FILE: `Файл ${MOCKS_FILE} пустой`,
  DATA_SENT: `Данные отправлены`
};

const app = express();
const {Router} = require(`express`);
const router = new Router();

app.use(express.json());
app.use(`/posts`, router);

const readMockData = async () => {
  let data = [];

  try {
    data = await fs.readFile(MOCKS_FILE, `utf8`);
    if (data === ``) {
      data = [];
      console.error(chalk.red(ServerMessage.EMPTY_FILE));
    }
  } catch (err) {
    if (err.code === `ENOENT`) {
      console.error(chalk.red(ServerMessage.FILE_NOT_FOUND));
    } else {
      console.error(chalk.red(err));
    }
  }

  return data;
};

router.use(`/`, (req, res) => {
  const result = readMockData();

  if (result instanceof Promise) {
    result
      .then((data) => {
        res.json(data);
        console.log(chalk.green(ServerMessage.DATA_SENT));
      })
      .catch((err) => console.error(chalk.red(err)));
  }
});

module.exports = {
  name: `--server`,
  run(args) {
    const port = Number.parseInt(args, 10) || PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(ServerMessage.ERROR, err));
      }
      return console.log(chalk.green(`${ServerMessage.CONNECT} ${port}`));
    });
  }
};
