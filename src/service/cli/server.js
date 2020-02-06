'use strict';

const http = require(`http`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const readContent = require(`./../../utils.js`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;
const NOT_FOUND_MESSAGE = `Not found`;

const StatusCode = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const ServerLogText = {
  ERROR: `Ошибка при создании сервера`,
  CONNECT: `Ожидаю соединений на `
};

// Рендерим список данных для возвращения клиенту
const renderResponseText = (stringsArray) => {
  const listString = `<ul>`;
  stringsArray.forEach((string) => {
    listString += `<li>${string}</li>`;
  });
  listString += `</ul>`;
  return listString;
};

// Ответ сервера
const onClientConnect = (request, response) => {
  switch (request.url) {
    case `/`:
      const responseText = `Привет!`;

      response.writeHead(StatusCode.OK, {
        'Content-Type': `text/html; charset=UTF-8`,
      });

      response.end();
      break;

    default:
      response.writeHead(StatusCode.NOT_FOUND, {
        'Content-Type': `text/plain; charset=UTF-8`,
      });
      response.end(NOT_FOUND_MESSAGE);
  }
};

module.exports = {
  name: `--server`,
  async run(args) {
    const port = Number.parseInt(args, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.info(chalk.red(ServerLogText.ERROR, err));
        }
        return console.info(chalk.green(ServerLogText.CONNECT + port));
      });
  }
};
